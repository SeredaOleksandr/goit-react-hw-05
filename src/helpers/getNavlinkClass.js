import clsx from 'clsx';

export const getNavlinkClass = (s, { isActive }) => {
  return clsx(s.link, isActive && s.active);
};
