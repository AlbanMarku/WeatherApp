import index from "./index.js"

const ui = (() => {

    async function pageContent(result) {
        try {
            const endpoint = `http://openweathermap.org/img/wn/${result.todayForecast.icon}@2x.png`;
            const response = await fetch(endpoint,{mode:"cors"});
            if (!response.ok) throw new Error(`image not found`);
            createWeather(result.todayForecast, response.url);
            createTemp(result.todayForecast);
            createForecast(result.allForecast);
        } catch(error){
            console.log("no image" + error);
        }
    }

    function createWeather(result, icon){
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

        searchBar.addEventListener("click", () =>{
            searchBar.value = "";
        });

        searchBar.placeholder = "Enter place name"

        wStatus.textContent = result.weatherStatus;
        citName.textContent = result.cityName;
        conName.textContent = result.countryName;
        dateName.textContent = result.time;
        img.src = icon;
    }

    function createTemp(result) {
        let feelTemp = document.querySelector(".feelTemp");
        let humid = document.querySelector(".humid");
        let speed = document.querySelector(".speed");

        feelTemp.textContent = result.feelsLike;
        humid.textContent = result.humidity;
        speed.textContent = result.wind;
    }

    function createForecast(forecastList) {
        let starterPoint = 0;
        let endPoint = 7;

        gridTemp(starterPoint, endPoint, forecastList);

        const nextBut = document.getElementById("next");
        nextBut.addEventListener("click", ()=>{
            if (endPoint < forecastList.length) {
                starterPoint = starterPoint + 7;
                endPoint = endPoint + 7;
                if (endPoint + 7 > forecastList.length) {
                    endPoint = forecastList.length;
                    starterPoint = endPoint - 7;
                }
                gridTemp(starterPoint, endPoint, forecastList);
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
                gridTemp(starterPoint, endPoint, forecastList);
            }
        })
    }

    function gridTemp(starterPoint, endPoint , forecastList) {
        const listArea = document.querySelector(".list");
        listArea.innerHTML = ""; 
        for (let i = starterPoint; i < endPoint; i++) {
            const item = document.createElement("li");
            item.classList.add("item");
            const text = document.createElement("p");
            text.textContent = forecastList[i].main.temp + " temp";
            listArea.appendChild(item);
            item.appendChild(text);
        }
    }

    return {pageContent}
})();

export default ui