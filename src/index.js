import style from "./style.css"
import weather from "./weather.js"

weather.getData().then((val)=>{
    console.log(val)
});