import { Link } from 'react-router-dom';
import s from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={s.cover}>
      {/* <button className={s.error_btn}>
        <Link to="/">Go to Home</Link>
      </button> */}
      <p className={s.error_massage}>Oops! Wrong page...</p>
      <p className={s.error_big}>404</p>
    </div>
  );
};

export default NotFoundPage;
