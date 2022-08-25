'use strict';

const axios = require('axios');

async function getMovies(request, response) {

    let { cityName } = request.query

    try {
        let url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}`
        let movieArray = await axios.get(url)
        let resultArray = movieArray.data.results.map(film => new movieResult(film));
        response.send(resultArray)
    } catch (error) {
        response.send(error.message).status(500);
    }
}


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

module.exports = getMovies;