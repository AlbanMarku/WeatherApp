const weather = (() => {
    async function getData() {
        const endpoint = "https://api.openweathermap.org/data/2.5/forecast?q=London&id=524901&appid=9bee3cb739586729ce79627217fb845a&units=metric";
        const response = await fetch(endpoint);
        const processedData = await response.json();
        // const weatherTemp = processedData.city.name //processedData.list[0].main.temp;
        return convertData(processedData)
    }

    function convertData(data) {
        console.log(data);
        const cityName = data.city.name;
        const countryName = data.city.country;
        const temp = data.list[0].main.temp;
        const tempMin = data.list[0].main.temp_min;
        const tempMax = data.list[0].main.temp_max;
        const feelsLike = data.list[0].main.feels_like;
        const list =[cityName, countryName,temp,tempMin, tempMax, feelsLike];
        return list
    }
    return {getData}
})()

export default weather