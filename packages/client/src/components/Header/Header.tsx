import cn from 'classnames';
import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getFontSize } from '../../helpers/getFontSize';
import '../../styles/icon.scss';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
import { Search } from '../Search';
import './Header.scss';

export const Header: FC = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { likedProductsCount, cartProductsCount } = useProductsContext();

  const toggleMenu = (status?: boolean) => {
    setIsMenuOpened(status !== undefined ? status : !isMenuOpened);
  };

  return (
    <>
      <header className="Header">
        <div className="Header__branding">
          <div className="Header__logo">
            <Logo type="header" />
          </div>

          <div className="Header__nav">
            <Navigation />
          </div>
        </div>

        <div className="Header__actions">
          <div className="Header__search">
            <Search />
          </div>

          <div className="Header__menu">
            <button
              className="Header__toggler"
              type="button"
              onClick={() => toggleMenu()}
              aria-expanded={isMenuOpened}
              aria-label="Toggle menu"
            >
              {isMenuOpened ? (
                <Icon width={18} height={18} type="close" />
              ) : (
                <Icon width={18} height={18} type="menu" />
              )}
            </button>
          </div>

          <div className="Header__icons">
            <div className="icon">
              <NavLink
                className={({ isActive }) =>
                  cn('icon__link', {
                    'icon__link--active': isActive,
                  })
                }
                to="favourites"
                aria-label={`Favorites${likedProductsCount > 0 ? `, ${likedProductsCount} items` : ''}`}
              >
                <div className="icon__image">
                  <Icon width={18} height={18} type="like" aria-hidden="true" />

                  {likedProductsCount > 0 && (
                    <div className="icon__counter" role="status">
                      <span
                        style={{ fontSize: getFontSize(likedProductsCount) }}
                      >
                        {likedProductsCount < 100 ? likedProductsCount : '99+'}
                      </span>
                    </div>
                  )}
                </div>
              </NavLink>
            </div>

            <div className="icon">
              <NavLink
                className={({ isActive }) =>
                  cn('icon__link', {
                    'icon__link--active': isActive,
                  })
                }
                to="cart"
                aria-label={`Shopping cart${cartProductsCount > 0 ? `, ${cartProductsCount} items` : ''}`}
              >
                <div className="icon__image">
                  <Icon width={18} height={18} type="cart" aria-hidden="true" />

                  {cartProductsCount > 0 && (
                    <div className="icon__counter" role="status">
                      <span
                        style={{ fontSize: getFontSize(cartProductsCount) }}
                      >
                        {cartProductsCount < 100 ? cartProductsCount : '99+'}
                      </span>
                    </div>
                  )}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <BurgerMenu isMenuOpened={isMenuOpened} toggleMenu={toggleMenu} />
    </>
  );
};
