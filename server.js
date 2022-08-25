
const express = require('express');
require('dotenv').config();

const cors = require('cors');

const axios = require('axios');



const app = express();
app.use(cors());
const PORT = process.env.PORT;


//WEATHER INFO
app.get('/weather', async (request, response) => {
    let { lat, lon } = request.query

    try {
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
        let weatherArray = await axios.get(url);
        let forecastArray = weatherArray.data.data.map(day => new Forecast(day));
        response.send(forecastArray)
    } catch (error) {
        response.send(error.message).status(500);
    }

})


class Forecast {
    constructor(dayData) {
        this.date = dayData.valid_date,
            this.description = dayData.weather.description
    }
}



//MOVIE INFO
app.get('/movies', async (request, response) => {
    let { cityName } = request.query

    try {
        let url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}`
        let movieArray = await axios.get(url)
        let resultArray = movieArray.data.results.map(film => new movieResult(film));
        response.send(resultArray)
    } catch (error) {
        response.send(error.message).status(500);
    }
})

class movieResult {
    constructor(filmOutput) {
        this.title = filmOutput.original_title;
        this.overview = filmOutput.overview;
        this.average_votes = filmOutput.vote_average;
        this.total_votes = filmOutput.vote_count;
        this.image_url = filmOutput.poster_path;
        this.popularity = filmOutput.popularity;
        this.released_on = filmOutput.release_date;
    }
}

//Catch
app.get('*', (response) => {
    response.status(404).send('This route does not exist')
});

app.listen(PORT, () => console.log(`We are up on PORT: ${PORT}`));