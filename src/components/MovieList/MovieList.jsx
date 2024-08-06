import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={s.movies}>
      {movies.map(movie => (
        <li key={movie.id} className={s.movie_list_item}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <div className={s.item_container}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={s.movi_poster}
              />
              <p className={s.movie_title}>{movie.title}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
