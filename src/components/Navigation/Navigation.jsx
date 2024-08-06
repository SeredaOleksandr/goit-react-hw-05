import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul className={s.navigation}>
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
