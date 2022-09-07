import style from "./style.css"
import weather from "./weather.js"

weather.getData("Tirana").then((val)=>{
    console.log(val.weatherStatus);
});