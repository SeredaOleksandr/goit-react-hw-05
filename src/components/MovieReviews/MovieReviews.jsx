const MovieReviews = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews &&
          reviews.map(review => (
            <li key={review.id}>
              <p>{review.content}</p>
              <p>Author: {review.author}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
