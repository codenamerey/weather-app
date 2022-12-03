import PubSub from './PubSub';
import weatherAPIManager from './weatherAPIManager';

export default (function() {
    const body = document.body;

    const renderScreen = function() {
        const main = renderMain();
        console.log(main);
        body.append(main);
    }

    const displayWeatherToScreen = function(data) {
        const temperature = document.querySelector('#temperature');
        temperature.textContent = data.temperature;
    }

    const renderMain = function() {
        const main = renderElement('main', null, 'main-screen');
        const heading1 = renderElement('h1', null, 'temperature');
        main.append(heading1);
        requestWeatherForCity('Manila');
        return main;
    }

    const requestWeatherForCity = function(city) {
        weatherAPIManager.queryCity(city);
    }

    const renderElement = function (el, text, id, className) {
        if (!(el || text || id || className)) return;
        const elem = document.createElement(el);
        if (text) elem.textContent = text;
        if (id) elem.id = id;
        if (className) elem.classList.add(className);
        return elem;
      }

      PubSub.subscribe("cityQuery", displayWeatherToScreen);

      return {renderScreen}
})();
