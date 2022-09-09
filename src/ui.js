import index from "./index.js"

const ui = (() => {

    async function pageContent(result) {
        try {
            const endpoint = `http://openweathermap.org/img/wn/${result.icon}@2x.png`;
            const response = await fetch(endpoint,{mode:"cors"});
            if (!response.ok) throw new Error(`image not found`);
            createWeather(result, response.url);
            createTemp(result);

        } catch(error){
            console.log(error);
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
        const tempArea = document.querySelector(".tempBox");
        let feelTemp = document.querySelector(".feelTemp");
        let humid = document.querySelector(".humid");
        let speed = document.querySelector(".speed");

        feelTemp.textContent = result.feelsLike;
        humid.textContent = result.humidity;
        speed.textContent = result.wind;
    }

    return {pageContent}
})();

export default ui