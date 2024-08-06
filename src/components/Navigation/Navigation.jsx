import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { getNavlinkClass } from '../../helpers/getNavlinkClass';

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul className={s.navigation}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => getNavlinkClass(s, { isActive })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => getNavlinkClass(s, { isActive })}
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
