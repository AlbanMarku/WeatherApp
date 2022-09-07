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
        const cityName = data.city.name;
        const countryName = data.city.country;
        const temp = data.list[0].main.temp;
        const tempMin = data.list[0].main.temp_min;
        const tempMax = data.list[0].main.temp_max;
        const feelsLike = data.list[0].main.feels_like;
        const list =[countryName, cityName, temp, tempMin, tempMax, feelsLike];
        return list
    }
    return {getData}
})();

export default weather