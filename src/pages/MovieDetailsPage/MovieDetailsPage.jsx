import { useEffect, useState } from 'react';
import { useParams, Route, useRouteMatch, Link } from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
} from '../api/api';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      setMovie(movieData);
    };

    const fetchCredits = async () => {
      const creditsData = await fetchMovieCredits(movieId);
      setCredits(creditsData);
    };

    const fetchReviews = async () => {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData.results);
    };

    fetchDetails();
    fetchCredits();
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <ul>
        <li>
          <Link to={`${url}/cast`}>Cast</Link>
        </li>
        <li>
          <Link to={`${url}/reviews`}>Reviews</Link>
        </li>
      </ul>
      <Route
        path={`${path}/cast`}
        render={() => <MovieCast cast={credits.cast} />}
      />
      <Route
        path={`${path}/reviews`}
        render={() => <MovieReviews reviews={reviews} />}
      />
    </div>
  );
};

export default MovieDetailsPage;
