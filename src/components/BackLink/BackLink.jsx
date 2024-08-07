import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import css from './BackLink.module.css';

const BackLink = ({ link, children }) => {
  return (
    <Link to={link} className={css.link}>
      <HiArrowLeft size="14" />
      {children}
    </Link>
  );
};
export default BackLink;
