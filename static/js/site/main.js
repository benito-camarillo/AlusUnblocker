AOS.init();
window.onload = () => {

if (typeof localStorage !== 'undefined') {
    var firstTime = localStorage.getItem("first_time");
        if(!firstTime) {
        // first time loaded!
        resetCloaks();
        localStorage.setItem("first_time","1");
        localStorage.setItem("cloakActive", 0)
    }
        if (localStorage.getItem("cloakActive") == 0) {
            if (localStorage.getItem("tabName") != null) {
                localStorage.setItem("tabName", document.getElementsByTagName("title")[0].text)
                localStorage.setItem("tabIcon", "./img/icon.svg")
            } else {
                document.title = "Alu's Unblocker"
            }
        } else {
            console.log("cloaking is enabled!")
            document.querySelector("link[rel*='icon']").href = localStorage.getItem('tabIcon');
            document.title = localStorage.getItem('tabName')
        }

        if (localStorage.getItem("footerHidden") == 'true') {
            hideFooter();
        }
        } else {
            console.error('No localstorage API exists!')
        }
}
function copyDiscord() {
    var tooltip = document.getElementById("discord-tooltip")
    navigator.clipboard.writeText("wearr.");
    tooltip.innerHTML = "Copied!"
}
function outFunc() {
    var tooltip = document.getElementById("discord-tooltip");
    tooltip.innerHTML = "Copy";
}