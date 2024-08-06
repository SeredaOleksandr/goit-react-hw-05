import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';

const getNavlinkClass = (s, { isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul className={css.navigation}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => getNavlinkClass(css, { isActive })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => getNavlinkClass(css, { isActive })}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
