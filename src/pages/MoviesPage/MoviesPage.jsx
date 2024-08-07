import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovie } from '../../api/movies';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) return;
      setLoader(true);
      try {
        const data = await searchMovie(query);
        setMovies(data.results);
      } catch (error) {
        setError(error);
        toast.error('Error fetching movies.');
      } finally {
        setLoader(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();

    const searchQuery = e.target.elements.search.value.trim();
    if (!searchQuery) {
      return toast.error('Please enter a search query.');
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={s.wrapper}>
      <h1>Search Movies</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="search"
          name="search"
          defaultValue={query}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      {loader && <p>Loading...</p>}
      {error && <p className={s.error}>{error.message}</p>}

      <MovieList movies={movies} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
