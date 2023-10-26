let navOpen = false;

function toggleNav() {
  if (navOpen == false) {
        document.getElementById("sidenav").style.width = "300px";
      navOpen = true;
  } else {
      document.getElementById("sidenav").style.width = "0%";
      navOpen = false;
  }
}

function openNav() {
    document.getElementById("sidenav").style.width = "300px";
}
function closeNav() {
    document.getElementById("sidenav").style.width = "0%";
}