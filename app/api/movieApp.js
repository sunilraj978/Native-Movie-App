import axios from "axios";
import { MOVIE_KEY } from "../../movie/Constant";

const baseUrl = "https://api.themoviedb.org/3";
const trendMovieUrl = `${baseUrl}/trending/movie/day?api_key=${MOVIE_KEY}`;
const upcomingMovie = `${baseUrl}/movie/upcoming?api_key=${MOVIE_KEY}`;
const topratedMovie = `${baseUrl}/movie/top_rated?api_key=${MOVIE_KEY}`;

export const image500 = (path) => `https://image.tmdb.org/t/p/w500/${path}`;
export const image342 = (path) => `https://image.tmdb.org/t/p/w342/${path}`;
export const image185 = (path) => `https://image.tmdb.org/t/p/w185/${path}`;

//Dynamic endPoints
const movieDetailsEndpoint = (id) =>
  `${baseUrl}/movie/${id}?api_key=${MOVIE_KEY}`;

const movieCreditsEndpoint = (id) =>
  `${baseUrl}/movie/${id}/credits?api_key=${MOVIE_KEY}`;

const similarMoviesEndpoint = (id) =>
  `${baseUrl}/movie/${id}/similar?api_key=${MOVIE_KEY}`;

//Person Details
const personDetailsEndpoint = (id) =>
  `${baseUrl}/person/${id}?api_key=${MOVIE_KEY}`;

const personMoviesEndpoint = (id) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${MOVIE_KEY}`;

//Search Movies
const searchMoviesDetails = `${baseUrl}/search/movie?api_key=${MOVIE_KEY}`;

const apiCall = async (endPoint, params) => {
  const options = {
    method: "GET",
    url: endPoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response?.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchTrendingMovie = () => {
  return apiCall(trendMovieUrl);
};

export const fetchUpcomingMovie = () => {
  return apiCall(upcomingMovie);
};

export const fetchTopRatedMovie = () => {
  return apiCall(topratedMovie);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetailsApi = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovieApi = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const fetchSearchMovies = (params) => {
  return apiCall(searchMoviesDetails, params);
};
