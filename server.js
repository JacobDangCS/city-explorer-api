
const express = require('express');
require('dotenv').config();

const cors = require('cors');

const weatherData = require('./data/weather.json');


const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.get('/weather', (request, response) => {
    let {lat, lon, searchQuery} = request.query

    try {
       let foundCity = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())
       let weatherArray = foundCity.data.map(day => new Forecast(day));
       response.send(weatherArray).status(200);
    } catch (error) {
        response.send(error.message).status(500);
    }
})

class Forecast {
    constructor(day){
        this.date = day.valid_date,
        this.description = day.weather.description
    }
}

//Catch
app.get('*', (request, response) => {
    response.status(404).send('This route does not exist')
});

app.listen(PORT, ()=> console.log(`We are up on PORT: ${PORT}`));