import PubSub from './PubSub';
import weatherAPIManager from './weatherAPIManager';

export default (function() {
    const body = document.body;

    const renderScreen = function() {
        const main = renderMain();
        body.append(main);
    }

    const displayWeatherToScreen = function(data) {
        const temperature = document.querySelector('#temperature');
        const comment = document.querySelector('#comment');
        if(!data) {
            temperature.textContent = 'No such city with that name, sorry!';
            comment.textContent = `Why don't you try again?`;
            return;
        }
        temperature.textContent = `It's ${data.temperature}°C in ${data.cityName}`;
        comment.textContent = generateComment(data.temperature);
    }

    const generateComment = function(temperature) {
        let comment = '';
        if(temperature < 10) comment = 'Ganito kalamig sa loob ng pridyider';
        if(temperature >= 10 && temperature <= 30) comment = 'Lamig oh. Suot ka sweater';
        if(temperature > 30 && temperature <= 38) comment = 'Meh, boring';
        if(temperature > 38) comment = 'Init. Ra ra kape';

        return comment;
    }

    const renderMain = function() {
        const main = renderElement('main', null, 'main-screen');
        const heading1 = renderElement('h1', null, 'temperature');
        const heading2 = renderElement('h2', null, 'comment');
        const input = renderElement('input', null, 'search_input');
        const button = renderElement('button', 'Search City', 'search_button');
        button.addEventListener('click', handleSearchButtonClick);

        main.append(heading1, heading2, input, button);
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

      const handleSearchButtonClick = function(e) {
        e.preventDefault();
        const search_input = document.querySelector('#search_input');
        requestWeatherForCity(search_input.value);
      }

      PubSub.subscribe("cityQuery", displayWeatherToScreen);

      return {renderScreen}
})();
