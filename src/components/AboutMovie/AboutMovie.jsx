import s from './AboutMovie.module.css';

export default function MovieItem({ movie }) {
  const { title, overview, vote_average, genres, poster_path } = movie;
  const imageLink = `https://image.tmdb.org/t/p/original/${poster_path}`;

  return (
    <div className={s.container}>
      <div>
        <img className={s.image} src={imageLink} alt={title} />
      </div>
      <div className={s.info}>
        <h2>{title}</h2>
        <p>User vote average: {vote_average}</p>
        <div>
          <h3>Overview</h3>
          <p>{overview}</p>
        </div>
        <div>
          <h3>Genres</h3>
          {genres && (
            <ul>
              {genres.map(({ id, name }) => (
                <li key={id}>
                  <p>{name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
