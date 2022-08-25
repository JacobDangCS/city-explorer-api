
const express = require('express');
require('dotenv').config();

const cors = require('cors');

const getWeather = require('./modules/weather.js');

const getMovies = require('./modules/movie');

const app = express();
app.use(cors());
const PORT = process.env.PORT;


//WEATHER INFO
app.get('/weather', getWeather)



//MOVIE INFO
app.get('/movies', getMovies)

//Catch
app.get('*', (response) => {
    response.status(404).send('This route does not exist')
});

app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`));