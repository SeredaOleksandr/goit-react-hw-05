import s from './MovieReviews.module.css';

const MovieReviews = ({ reviews }) => {
  return (
    <div className={s.wrapper}>
      {/* <h2>Reviews</h2> */}
      <ul>
        {reviews &&
          reviews.map(review => (
            <li key={review.id}>
              <p>{review.content}</p>
              <h3>Author: {review.author}</h3>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
