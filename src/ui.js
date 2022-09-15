import index from "./index.js"
import humidSvg from "./humid.svg"
import windSvg from "./wind.svg"
import feelSvg from "./feelsLike.svg"

const ui = (() => {

    async function pageContent(result) {//load all page sections
        try {
            const endpoint = `http://openweathermap.org/img/wn/${result.todayForecast.icon}@2x.png`;
            const response = await fetch(endpoint,{mode:"cors"});
            if (!response.ok) throw new Error(`image not found`);
            createWeather(result.todayForecast, response.url);
            createTemp(result.todayForecast);
            createForecast(result.allForecast);
        } catch(error){
            alert(error);
            console.log("no image" + error);
        }
    }

    function createWeather(result, icon){//creates left side weather stats and ui.
        let img = document.querySelector(".imger");
        let wStatus = document.querySelector(".weatherStatus");
        let citName = document.querySelector(".cityName");
        let conName = document.querySelector(".countryName");
        let dateName = document.querySelector(".dateName");
        const searchBar = document.querySelector("#googler");
        const googleSearch = new google.maps.places.SearchBox(searchBar);
        
        googleSearch.addListener("places_changed", () => {
            const place = googleSearch.getPlaces()[0];
            if (place == null) return
            const selectedPlace = place.address_components[0].long_name;
            index.searchInput(selectedPlace);
        });

        searchBar.addEventListener("click", handleSearch);

        searchBar.placeholder = "Enter place name"

        wStatus.textContent = result.weatherStatus;
        citName.textContent = result.cityName;
        conName.textContent = result.countryName;
        dateName.textContent = result.time;
        img.src = icon;
    }

    function handleSearch(e) {
        const searchBar = e.target;
        searchBar.value = "";
    }

    function createTemp(result) { //creates right side stats.

        let feelTemp = document.querySelector(".feel");
        let humid = document.querySelector(".humid");
        let speed = document.querySelector(".wind");

        let humidImg = document.querySelector(".humidImg");
        let windImg = document.querySelector(".windImg");
        let feelImg = document.querySelector(".feelImg");
        
        humidImg.src = humidSvg;
        humid.textContent = "Humidity "+result.humidity + " \u{00B0}C";

        windImg.src = windSvg;
        speed.textContent = "Wind " + result.wind + " \u{00B0}C";

        feelImg.src = feelSvg;
        feelTemp.textContent = "Feels like "+result.feelsLike + " \u{00B0}C";
    }

    function buttonStuff(forecastList) {
        let starterPoint = 0;
        let endPoint = 7;
        const listArea = document.querySelector(".listArea");
        const nextBut = document.getElementById("next");
        nextBut.addEventListener("click", ()=> {
            console.log("hit");
            if (endPoint < forecastList.length) {
                starterPoint = starterPoint + 7;
                endPoint = endPoint + 7;
                if (endPoint + 7 > forecastList.length) {
                    endPoint = forecastList.length;
                    starterPoint = endPoint - 7;
                }
                gridTemp(starterPoint, endPoint, forecastList).then((result) => {
                    listArea.innerHTML = "";
                    listArea.appendChild(result);
                });
            }
        });

        const prevBut = document.getElementById("prev");
        prevBut.addEventListener("click", () => {
            if (starterPoint > 0) {
                starterPoint = starterPoint - 7;
                endPoint = endPoint - 7;
                if (starterPoint - 7 < 0) {
                    endPoint = 7;
                    starterPoint = 0;
                }
                gridTemp(starterPoint, endPoint, forecastList).then((result) => {
                    listArea.innerHTML = "";
                    listArea.appendChild(result);
                });
            }
        });
    }

    function noop() {
        //deasign buts;
    }

    function createForecast(forecastList) {//creates forecast area.
        const listArea = document.querySelector(".listArea");

        gridTemp(0, 7, forecastList).then((result) => {
            listArea.innerHTML = "";
            listArea.appendChild(result);
        });

        buttonStuff(forecastList);
        buttonStuff = noop;
    }

    async function gridTemp(starterPoint, endPoint , forecastList) {//creates an item "card" for each forecast data.
        const list = document.createElement("ul");
        list.innerHTML = "";
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        for (let i = starterPoint; i < endPoint; i++) {
            const item = document.createElement("li");
            item.classList.add("item");
            const text = document.createElement("p");
            const dateText = document.createElement("p");
            text.textContent = forecastList[i].main.temp + " \u{00B0}C";
            const d = new Date(forecastList[i].dt_txt);
            dateText.textContent = weekday[d.getDay()];
            const img = document.createElement("img");
            try {
                const endpoint = `http://openweathermap.org/img/wn/${forecastList[i].weather[0].icon}@2x.png`;
                const response = await fetch(endpoint,{mode:"cors"});
                if (!response.ok) throw new Error(`image not found`);
                img.src = response.url;
                list.appendChild(item);
                item.appendChild(dateText);
                item.appendChild(text);
                item.appendChild(img);
            } catch (error) {
                alert(error);
            }
        }
        return list
    }

    return {pageContent}
})();

export default ui