const MovieCast = ({ cast }) => {
  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast &&
          cast.map(actor => (
            <li key={actor.id}>
              <p>{actor.name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;
