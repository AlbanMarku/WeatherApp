const ui = (() => {

    function pageContent(result) {
        createWeather(result);
    }

    function createWeather(result) {
        const weatherArea = document.querySelector(".weatherBox");
        let wStatus = document.createElement("h1");
        let citName = document.createElement("h2");
        let conName = document.createElement("h3");
        let dateName = document.createElement("p");
        let img = document.createElement("img");

        wStatus.textContent = result.weatherStatus;
        citName.textContent = result.cityName;
        conName.textContent = result.countryName;
        dateName.textContent = result.time;
        img.src = `http://openweathermap.org/img/wn/${result.icon}@2x.png`

        weatherArea.appendChild(wStatus);
        weatherArea.appendChild(citName);
        weatherArea.appendChild(conName);
        weatherArea.appendChild(dateName);
        weatherArea.appendChild(img);
    }
    return {pageContent}
})();

export default ui