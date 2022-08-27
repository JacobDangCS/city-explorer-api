'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const {getWeather} = require('./modules/weather.js');
const {getMovies} = require('./modules/movie.js');

const app = express();

app.use(cors());

app.get('/weather', weatherHandler);

//MOVIE INFO
app.get('/movies', movieHandler)




function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  getWeather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
} 

function movieHandler(request, response){
    let {cityName} = request.query;
    getMovies(cityName)
    .then(movieSummaries => response.send(movieSummaries))
    .catch((error) => {
        console.error(error);
        response.status(200).send('Sorry. Something went wrong!')
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));