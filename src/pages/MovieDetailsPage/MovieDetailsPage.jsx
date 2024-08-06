import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
} from '../../api/movies';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const getDetails = async id => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetails(id);
        setDetails(data);
      } catch (error) {
        setError(true);
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getDetails(movieId);
    }
  }, [movieId]);

  const memoizedDetails = useMemo(() => details, [details]);
  const memoizedLoading = useMemo(() => loading, [loading]);
  const memoizedError = useMemo(() => error, [error]);

  return (
    <>
      <button className={clsx(memoizedError ? s.none : s.ok)}>
        <Link to={backLink.current}>Go back</Link>
      </button>
      {memoizedLoading && <p>Loading...</p>}
      {memoizedError && <NotFoundPage />}
      {!memoizedError && (
        <div>
          <h2>{memoizedDetails.title}</h2>
          <div className={s.container}>
            <img
              className={s.movie_img}
              src={`https://image.tmdb.org/t/p/w500${memoizedDetails.poster_path}`}
              alt={memoizedDetails.title}
            />
            <div className={s.text_container}>
              <h3>Genres</h3>
              {memoizedDetails.genres && memoizedDetails.genres.length > 0 ? (
                <div className={s.genre_container}>
                  {memoizedDetails.genres.map(genre => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </div>
              ) : (
                <p>No genres available</p>
              )}
              <p>
                User Score:{' '}
                {memoizedDetails.vote_average
                  ? Math.ceil(memoizedDetails.vote_average * 10)
                  : 0}
                %
              </p>
              <h3>Overview</h3>
              <p>{memoizedDetails.overview}</p>
            </div>
          </div>
        </div>
      )}
      <div className={clsx(memoizedError ? s.none : s.ok)}>
        <p>Additional information</p>
        <ul className={s.wraper_link}>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Toaster />
    </>
  );
};

export default MovieDetailsPage;
