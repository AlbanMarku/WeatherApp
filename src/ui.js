import index from "./index.js"

const ui = (() => {

    function pageContent(result) {
        createWeather(result);
    }

    function clearContent() {
        const weatherArea = document.querySelector(".weatherBox");
        const tempArea = document.querySelector(".tempBox");
        const weatherPic = document.querySelector(".weatherPic");

        weatherArea.innerHTML = "";
        tempArea.innerHTML = "";
        weatherPic.innerHTML = "";
    }

    function createWeather(result) {
        const weatherArea = document.querySelector(".weatherBox");
        let wStatus = document.createElement("h1");
        let citName = document.createElement("h2");
        let conName = document.createElement("h3");
        let dateName = document.createElement("p");
        let img = document.createElement("img");
        let searchBar = document.createElement("input");
        const googleSearch = new google.maps.places.SearchBox(searchBar);

        googleSearch.addListener("places_changed", () => {
            const place = googleSearch.getPlaces()[0];
            if (place == null) return
            const selectedPlace = place.address_components[0].long_name;
            index.searchInput(selectedPlace);
        });

        wStatus.textContent = result.weatherStatus;
        citName.textContent = result.cityName;
        conName.textContent = result.countryName;
        dateName.textContent = result.time;

        searchBar.type = "text";
        searchBar.placeholder = "Enter location";

        fetch(`http://openweathermap.org/img/wn/${result.icon}@2x.png`,{ mode: "cors" }).then((fetchedImage)=>{
            img.src = fetchedImage.url;
            clearContent();


            weatherArea.appendChild(wStatus);
            weatherArea.appendChild(citName);
            weatherArea.appendChild(conName);
            weatherArea.appendChild(dateName);
            weatherArea.appendChild(img);//removing this stops the flicker
            weatherArea.appendChild(searchBar);


        }).catch(()=>{
            console.log("no");
            alert("no");
        });
    }

    function createTemp(result) {
        const tempArea = document.querySelector(".tempBox");
        let feelTemp = document.createElement("p");
        let humid = document.createElement("p");
        let speed = document.createElement("p");

        feelTemp.textContent = result.feelsLike;
        humid.textContent = result.humidity;
        speed.textContent = result.wind;

        tempArea.appendChild(feelTemp);
        tempArea.appendChild(humid);
        tempArea.appendChild(speed);
    }
    return {pageContent}
})();

export default ui