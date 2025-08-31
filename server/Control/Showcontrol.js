import axios from 'axios'
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import { inngest } from '../Inngest/index.js';

// Get 250 top movies from IMDB RapidAPI
export const getnowplayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get('https://imdb236.p.rapidapi.com/api/imdb/most-popular-movies', {
      headers: {
        'x-rapidapi-host': "imdb236.p.rapidapi.com",
        'x-rapidapi-key': `${process.env.X_RAPIAPI_KEY}`
      },
    })
    const movies = data;
    res.json({ success: true, movies: movies });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// Admin can add any movie from that 250 movies to database
export const addshow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body
    let movie = await Movie.findById(movieId)
    if (!movie) {
      // Fetch movie details and credits from TMDB API
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, { headers: { Authorization: ` Bearer ${process.env.TMDB_API_KEY}` } }), axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, { headers: { Authorization: ` Bearer ${process.env.TMDB_API_KEY}` } })])

      const movieApiData = movieDetailsResponse.data;
      const movieCreditData = movieCreditsResponse.data;
      const movieDetails = {
        _id: movieId,
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      }
      movie = await Movie.create(movieDetails)
    }
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date;
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {}
        })
      })
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }
    res.json({ success: true, message: 'Show Added successfully' })

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message })
  }
}

// Get Single movie from database
export const getmovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } });
    const movie = await Movie.findById(movieId);
    const datetime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split('T')[0];
      if (!datetime[date]) {
        datetime[date] = [];
      }
      datetime[date].push({ time: show.showDateTime, showId: show._id })
    })
    res.json({ success: true, movie, datetime })
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

