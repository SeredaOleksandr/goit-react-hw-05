import { useEffect, useState } from 'react';
import s from './HomePage.module.css';
import { fetchTrendingMovies } from '../../api/movies';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
      {loading && <p className={s.loading}>Loading...</p>}
      {error && <p className={s.error}>Error: {error}</p>}
      {/* <MovieList results={movies} /> */}
    </div>
  );
};

export default HomePage;
