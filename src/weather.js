const weather = (() => {
    async function getData(city) {
        try {
            const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=524901&appid=9bee3cb739586729ce79627217fb845a&units=metric`;
            const response = await fetch(endpoint,{ mode: "cors" });
            if (!response.ok) throw new Error(`City ${city} not found`);
            const processedData = await response.json();
            const dataObj = {
                todayForecast: convertData(processedData),
                allForecast: convertForecastData(processedData)
            }
            return dataObj
        } catch (error) {
            alert("where it at");
            return getData("London")
          }
    }

    function convertForecastData(data) {
        let listOfWeather = [];
        for (let i = 0; i < data.list.length; i++) {
            listOfWeather.push(data.list[i]);
        }
        return listOfWeather
    }

    function convertData(data) {
        const theWeather = {
            cityName: data.city.name,
            countryName: data.city.country,
            temp: data.list[0].main.temp,
            tempMin: data.list[0].main.temp_min,
            tempMax: data.list[0].main.temp_max,
            feelsLike: data.list[0].main.feels_like,
            weatherStatus: data.list[0].weather[0].description,
            humidity: data.list[0].main.humidity,
            wind: data.list[0].wind.speed,
            icon: data.list[0].weather[0].icon,
            time: data.list[0].dt_txt
        }
        return theWeather
    }
    return {getData}
})();

export default weather