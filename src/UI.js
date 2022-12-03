import weatherAPIManager from './weatherAPIManager';

export default (function() {
    const body = document.body;

    const renderScreen = function() {
        const main = renderMain();
        console.log(main);
        body.append(main);
    }

    
    const weatherInfo = function() {
        return weatherAPIManager.queryCity('Manila');
    }

    const renderMain = function() {
        const main = renderElement('main', null, 'main-screen');
        const heading1 = renderElement('h1', null, 'temperature');
        main.append(heading1);
        const weather_info = weatherInfo();
        console.log(weatherInfo.cityName);
        return main;
    }

    const renderElement = function (el, text, id, className) {
        if (!(el || text || id || className)) return;
        const elem = document.createElement(el);
        if (text) elem.textContent = text;
        if (id) elem.id = id;
        if (className) elem.classList.add(className);
        return elem;
      }

      return {renderScreen}
})();
