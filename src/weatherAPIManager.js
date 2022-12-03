import PubSub from './PubSub';

export default (function() {
    const API_KEY = 'b02fb820d29e1fbeec8ca057428a5ea8';
    
    function convertData(cityData) {
        const temperature = cityData.main.temp;
        const cityName = cityData.name;
        return {temperature, cityName}
    }

    async function queryCity(city) {
        console.log(city);
        let query = `https://api.openweathermap.org/data/2.5/weather?&appid=${API_KEY}&q=${city}&units=metric`;
        try{
            let response = await fetch(query);
            let cityData = convertData(await response.json());
            PubSub.publish("cityQuery", cityData);
        }
        catch{
            PubSub.publish("cityQuery", null);
        }
    }

    return {queryCity}
})();
