import { useState } from 'react';
import { searchMovie } from '../../api/movies';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!query.trim()) {
      return toast.error('Please enter a search query.');
    }

    const data = await searchMovie(query);
    setMovies(data.results);
  };

  return (
    <div className={s.wrapper}>
      <h1>Search Movies</h1>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      {loader && <p>Loading...</p>}
      {error && <p className={style.error}>{error}</p>}

      <MovieList movies={movies} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MoviesPage;
