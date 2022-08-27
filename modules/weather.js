'use strict';

const axios = require('axios');

let cache = require('./cache');


async function getWeather(latitude, longitude) {

    try {

        const key = 'weather-' + latitude + longitude;
        const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}`;

        if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24)) {
            console.log('Cache hit');
            response.status(200).send(cache[key].data);
        } else {
            console.log('Cache miss');
            cache[key] = {};
            cache[key].timestamp = Date.now();
            cache[key].data = axios.get(url)
                .then(response => parseWeather(response.data));
        }

        return cache[key].data;
    } catch (error) {
        (error)
    }

}


function parseWeather(weatherData) {
    try {
        const weatherSummaries = weatherData.data.map(day => {
            return new Forecast(day);
        });
        return Promise.resolve(weatherSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}


// OLD CODE
// async function getWeather(request, response) {
//     let { lat, lon } = request.query
//     try {
//         let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
//         let weatherArray = await axios.get(url);
//         let forecastArray = weatherArray.data.data.map(day => new Forecast(day));
//         response.send(forecastArray)
//     } catch (error) {
//         response.send(error.message).status(500);
//     }

// }


class Forecast {
    constructor(dayData) {
        this.date = dayData.valid_date,
            this.description = dayData.weather.description
    }
}


module.exports = { getWeather };

