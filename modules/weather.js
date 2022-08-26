'use strict';

const axios = require('axios');

//const cache = require('/.cache')

async function getWeather(request, response) {
    let { lat, lon } = request.query
    try {
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
        let weatherArray = await axios.get(url);
        let forecastArray = weatherArray.data.data.map(day => new Forecast(day));
        response.send(forecastArray)
    } catch (error) {
        response.send(error.message).status(500);
    }

}


class Forecast {
    constructor(dayData) {
        this.date = dayData.valid_date,
            this.description = dayData.weather.description
    }
}


module.exports = {getWeather};