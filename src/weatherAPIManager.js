export default (function() {
    const API_KEY = 'b02fb820d29e1fbeec8ca057428a5ea8';
    
    function convertData(cityData) {
        const temperature = cityData.main.temp;
        return {temperature}
    }

    async function queryCity(city) {
        let query = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&q=${city}&units=metric`;
        let response = await fetch(query);
        let cityData = convertData(await response.json());
        return cityData;
    }

    return {queryCity}
})();
