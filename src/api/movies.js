import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9
  .eyJhdWQiOiJkMmZlYWQ0NmI1NjljM2FiN2VlMGI0OWRiMzEyMmQxYiIsIm5iZiI6MTcyMTk5MzY2NS4yMzYxNzgsInN1YiI6IjY2YTM4ODYxYjI0MWExMDhhNGNhOWQwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
  .lywIEjOQjR0Un - zY6Zo3KfW2_Xq0XY34FuejEva4koM;`,
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query, page = 1) => {
  const response = await axios.get('/search/movie', {
    params: { query, page },
  });
  return response.data;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data;
};
