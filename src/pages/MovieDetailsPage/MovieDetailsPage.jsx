import { Suspense, useRef, useEffect, useState } from 'react';
import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
} from '../../api/movies';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import s from './MovieDetailsPage.module.css';
import BackLink from '../../components/BackLink/BackLink';

// const MovieDetailsPage = () => {
//   const { movieId } = useParams();
//   const [details, setDetails] = useState({});
//   const [credits, setCredits] = useState({});
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const location = useLocation();
//   const backLinkHref = useRef(location.state ?? '/');

//   useEffect(() => {
//     const getDetails = async id => {
//       try {
//         setLoading(true);
//         setError(false);
//         const [movieDetails, movieCredits, movieReviews] = await Promise.all([
//           fetchMovieDetails(id),
//           fetchMovieCredits(id),
//           fetchMovieReviews(id),
//         ]);
//         setDetails(movieDetails);
//         setCredits(movieCredits);
//         setReviews(movieReviews.results); // Ensure this matches your API response structure
//       } catch (error) {
//         setError(true);
//         console.error('Error fetching movie details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (movieId) {
//       getDetails(movieId);
//     }
//   }, [movieId]);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

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
  // const userScore = Math.ceil(details.vote_average * 10);
  // const releaseYear = details.release_date
  //   ? details.release_date.slice(0, 4)
  //   : 'N/A';

  return (
    <div className={s.wrapper}>
      <BackLink link={backLinkHref.current}>Go Back!</BackLink>
      {loading && <p>Loading...</p>}
      {error && <NotFoundPage />}
      {!error && (
        <div className={s.movie_wrapper}>
          <h2>{details.title}</h2>
          <div className={s.container}>
            <img
              className={s.movie_img}
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt={details.title}
            />
            <div className={s.text_container}>
              <h3>Genres</h3>
              {details.genres && details.genres.length > 0 ? (
                <div className={s.genre_container}>
                  {details.genres.map(genre => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </div>
              ) : (
                <p>No genres available</p>
              )}
              <p>
                User Score:{' '}
                {details.vote_average
                  ? Math.ceil(details.vote_average * 10)
                  : 0}
                %
              </p>
              <h3>Overview</h3>
              <p>{details.overview}</p>
            </div>
          </div>
        </div>
      )}
      <div className={clsx(error ? s.none : s.ok)}>
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
        <Outlet />
      </Suspense>
      <Toaster />
    </div>
  );
};

export default MovieDetailsPage;
