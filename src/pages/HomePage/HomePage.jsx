import { useEffect, useState } from 'react';
import s from './HomePage.module.css';
import { fetchTrendingMovies } from '../../api/movies';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const fetchedMovies = await fetchTrendingMovies();
        setMovies(fetchedMovies);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1 className={s.title}>Trending today</h1>
      <MovieList movies={movies} />
      {isLoading && <p className={s.loading}>Loading...</p>}
      {error && <p className={s.error}>Error: {error.message}</p>}
    </div>
  );
};

export default HomePage;
