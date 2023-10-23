import express from 'express';
import { createBareServer } from "@tomphttp/bare-server-node"
import { uvPath } from "@titaniumnetwork-dev/ultraviolet"
import http from 'node:http';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");
app.use(express.static(path.join(process.cwd(), "static")));
app.use("/uv/", express.static(uvPath));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  })
);

app.get("/proxy/uv", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'static', 'uv.html'));
})

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Server running at http://localhost:${PORT}/.`);
});

server.listen({
  port: PORT
});