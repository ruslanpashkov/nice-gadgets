import cn from 'classnames';
import { FC, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navigation.scss';

export interface NavigationItem {
  id: number;
  title: string;
  path: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Phones', path: 'phones' },
  { id: 3, title: 'Tablets', path: 'tablets' },
  { id: 4, title: 'Accessories', path: 'accessories' },
];

interface Props {
  isOpen?: boolean;
  toggleMenu?: (status?: boolean) => void;
}

export const Navigation: FC<Props> = ({ isOpen = true, toggleMenu }) => {
  const handleLinkClick = useCallback(() => {
    toggleMenu?.(false);
  }, [toggleMenu]);

  const { pathname } = useLocation();

  return (
    <nav className="Navigation" aria-label="Main Navigation">
      <ul className="Navigation__list" role="menubar">
        {NAVIGATION_ITEMS.map(({ id, path, title }) => (
          <li key={id} className="Navigation__item" role="none">
            <NavLink
              className={({ isActive }) =>
                cn('Navigation__link', {
                  'Navigation__link--active': isActive,
                })
              }
              to={path}
              onClick={handleLinkClick}
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              aria-current={pathname === path ? 'page' : undefined}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
