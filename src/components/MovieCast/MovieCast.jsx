import { useEffect, useState } from 'react';
import { fetchMovieCredits } from '../../api/movies';
import { useParams } from 'react-router-dom';
import s from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState({ cast: [] });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCastById = async id => {
      try {
        setLoading(true);
        const data = await fetchMovieCredits(id);
        setCast(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getCastById(movieId);
    }
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && !error && cast.cast.length === 0 && (
        <p>We don`t have cast for this movie</p>
      )}
      <ul className={s.wrapper}>
        {cast.cast.map(actor => (
          <li key={actor.id}>
            <img
              className={s.actor_image}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : 'https://via.placeholder.com/150'
              }
              alt={actor.name}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
