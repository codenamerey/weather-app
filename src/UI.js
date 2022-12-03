import PubSub from './PubSub';
import weatherAPIManager from './weatherAPIManager';
//import images
import iceberg from './res/iceberg.jpg';
import coldDoggy from './res/cold-doggy.jpg';
import pasture from './res/pasture.jpg';
import coffee from './res/coffee.jpg';

export default (function() {
    const body = document.body;

    const renderScreen = function() {
        const main = renderMain();
        body.append(main);
    }

    const displayWeatherToScreen = function(data) {
        const temperature = document.querySelector('#temperature');
        const comment = document.querySelector('#comment');
        const attribution = document.querySelector('#attribution');
        console.log('got called twice');
        if(!data) {
            temperature.textContent = 'No such city with that name, sorry!';
            comment.textContent = `Why don't you try again?`;
            return;
        }
        temperature.textContent = `It's ${data.temperature}°C in ${data.cityName}`;
        comment.textContent = generateComment(data.temperature)[0];
        attribution.innerHTML = generateComment(data.temperature)[1];
        body.style.background = `url(${generateComment(data.temperature)[2]})`;
        console.log(generateComment(data.temperature));
        // attribution.textContent = generatePictureAttribution(data.temperature);
    }

    const generateComment = function(temperature) {
        let comment = '';
        let attribution = '';
        let pictures = [iceberg, coldDoggy, pasture, coffee];
        let pictureURL = '';
        if(temperature < 10) {
            comment = 'Ganito kalamig sa loob ng pridyider';
            pictureURL = pictures[0];
            attribution = `Photo by <a href="https://unsplash.com/@anniespratt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Annie Spratt</a> on <a href="https://unsplash.com/s/photos/iceberg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            `;
        }
        if(temperature >= 10 && temperature <= 30) {
            comment = 'Lamig oh. Suot ka sweater';
            pictureURL = pictures[1];
            attribution = `Photo by <a href="https://unsplash.com/@matthewhenry?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Matthew Henry</a> on <a href="https://unsplash.com/s/photos/cold?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            `;
        }
        if(temperature > 30 && temperature <= 38) {
            comment = 'Meh, bo-ring';
            pictureURL = pictures[2];
            attribution = `Photo by <a href="https://unsplash.com/@therawhunter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Massimiliano Morosinotto</a> on <a href="https://unsplash.com/s/photos/windows-xp-wallpaper?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            `;
        }
        if(temperature > 38) {
            comment = 'Init. Ra ra kape';
            pictureURL = pictures[3];
            attribution = `Photo by <a href="https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nathan Dumlao</a> on <a href="https://unsplash.com/s/photos/coffee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
            `;
        }

        return [comment, attribution, pictureURL];
    }

    const renderMain = function() {
        const main = renderElement('main', null, 'main-screen');
        const heading1 = renderElement('h1', null, 'temperature');
        const heading2 = renderElement('h2', null, 'comment');
        const input = renderElement('input', null, 'search_input');
        const button = renderElement('button', 'Search City', 'search_button');
        const aside = renderElement('aside', null, 'attribution');
        button.addEventListener('click', handleSearchButtonClick);

        main.append(heading1, heading2, input, button, aside);
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
