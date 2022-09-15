import style from "./style.css"
import weather from "./weather.js"
import ui from "./ui.js"
import logo from "./logo.png"

const index = (() => {
    document.addEventListener("DOMContentLoaded", () => {
        const p = document.querySelector(".floating");
        p.src = logo;
        weather.getData("london").then((result)=> {
            ui.pageContent(result);
        });
    });

    function searchInput(locationInput){
        weather.getData(locationInput).then((result)=> {
            ui.pageContent(result);
        });
    }

    return {searchInput}
})();

export default index

//TODO: courasel. Promise the image.