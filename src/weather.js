const weather = (() => {
    async function getData(city) {
        try {
            const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&id=524901&appid=9bee3cb739586729ce79627217fb845a&units=metric`;
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error(`City ${city} not found`);
            const processedData = await response.json();
            return convertData(processedData)
        } catch (error) {
            alert(error);
            return null
          }
    }

    function convertData(data) {
        const theWeather = {
            cityName: data.city.name,
            countryName: data.city.country,
            temp: data.list[0].main.temp,
            tempMin: data.list[0].main.temp_min,
            tempMax: data.list[0].main.temp_max,
            feelsLike: data.list[0].main.feels_like,
            weatherStatus: data.list[0].weather[0].description
        }
        return theWeather
    }
    return {getData}
})();

export default weather