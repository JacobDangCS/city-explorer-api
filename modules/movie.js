'use strict';

const axios = require('axios');

let cache = require('./cache')

async function getMovies(cityName) {

    try {
        let key = 'movie-' + cityName;
        let url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}`

        if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24)) {
            console.log('Cache hit');
            response.status(200).send(cache[key].data);
        } else {
            console.log('Cache miss');
            cache[key] = {};
            cache[key].timestamp = Date.now();
            cache[key].data = axios.get(url)
                .then(response => parseMovie(response.data.results));
        }

        return cache[key].data;
    } catch (error) {
        (error)
    }

}


function parseMovie(movieData) {
    try {
        const movieSummaries = movieData.map(output => {
            return new movieResult(output);
        });
        return Promise.resolve(movieSummaries);
    } catch (e) {
        return Promise.reject(e);
    }
}


//OLD CODE
// async function getMovies(request, response) {

//     let { cityName } = request.query

//     try {
//         let url = `https://api.themoviedb.org/3/search/movie?query=${cityName}&api_key=${process.env.MOVIE_API_KEY}`
//         let movieArray = await axios.get(url)
//         let resultArray = movieArray.data.results.map(film => new movieResult(film));
//         response.send(resultArray)
//     } catch (error) {
//         response.send(error.message).status(500);
//     }
// }


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

module.exports = { getMovies };