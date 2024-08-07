import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
  Routes,
  Route,
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
import BackLink from '../../components/BackLink/BackLink';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [credits, setCredits] = useState({});
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/movies');

  useEffect(() => {
    const getDetails = async id => {
      try {
        setLoading(true);
        setError(false);
        const [movieDetails, movieCredits, movieReviews] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
          fetchMovieReviews(id),
        ]);
        setDetails(movieDetails);
        setCredits(movieCredits);
        setReviews(movieReviews);
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
  const memoizedCredits = useMemo(() => credits, [credits]);
  const memoizedReviews = useMemo(() => reviews, [reviews]);
  const memoizedLoading = useMemo(() => loading, [loading]);
  const memoizedError = useMemo(() => error, [error]);

  return (
    <div className={s.wrapper}>
      <BackLink link={backLinkHref.current}>Go Back!</BackLink>
      {memoizedLoading && <p>Loading...</p>}
      {memoizedError && <NotFoundPage />}
      {!memoizedError && (
        <div className={s.movie_wrapper}>
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
        <h3 className={s.sub_title}>Additional information</h3>
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
        <Routes>
          <Route
            path="cast"
            element={<MovieCast cast={memoizedCredits.cast} />}
          />
          <Route
            path="reviews"
            element={<MovieReviews reviews={memoizedReviews} />}
          />
        </Routes>
        <Outlet />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default MovieDetailsPage;
