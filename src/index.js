import style from "./style.css"
import weather from "./weather.js"
import ui from "./ui.js"

document.addEventListener("DOMContentLoaded", () => {
    weather.getData("tirana").then((result)=> {
        ui.pageContent(result);
    });
});