import s from './MovieReviews.module.css';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api/movies';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviewsById = async id => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(id);
        setReviews(data || []);
      } catch (error) {
        console.error(`Error fetching reviews: ${error.message}`);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) getReviewsById(movieId);
  }, [movieId]);

  return (
    <div className={s.wrapper}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p>{review.content}</p>
              <h3>Author: {review.author}</h3>
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
