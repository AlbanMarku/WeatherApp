import style from "./style.css"
import weather from "./weather.js"
import ui from "./ui.js"

const index = (() => {
    document.addEventListener("DOMContentLoaded", () => {
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

//TODO: courasel