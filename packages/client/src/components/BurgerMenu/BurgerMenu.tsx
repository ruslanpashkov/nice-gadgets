import cn from 'classnames';
import FocusTrap from 'focus-trap-react';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getFontSize } from '../../helpers/getFontSize';
import '../../styles/icon.scss';
import { Icon } from '../Icon';
import { Navigation } from '../Navigation';
import './BurgerMenu.scss';

interface Props {
  isMenuOpened: boolean;
  toggleMenu: (status?: boolean) => void;
}

export const BurgerMenu: FC<Props> = ({ isMenuOpened, toggleMenu }) => {
  const { likedProductsCount, cartProductsCount } = useProductsContext();

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpened]);

  return (
    <FocusTrap
      active={isMenuOpened}
      focusTrapOptions={{
        allowOutsideClick: true,
        escapeDeactivates: true,
        onDeactivate: () => toggleMenu(false),
      }}
    >
      <nav
        className={cn('BurgerMenu', {
          'BurgerMenu--opened': isMenuOpened,
        })}
        aria-expanded={isMenuOpened}
      >
        <Navigation isOpen={isMenuOpened} toggleMenu={toggleMenu} />

        <div className="BurgerMenu__icons">
          <div className="icon">
            <Link
              className="icon__link"
              to="favourites"
              onClick={() => toggleMenu(false)}
              tabIndex={isMenuOpened ? 0 : -1}
              aria-label={`Favorites${likedProductsCount > 0 ? `, ${likedProductsCount} items` : ''}`}
            >
              <div className="icon__image">
                <Icon width={18} height={18} type="like" />

                {likedProductsCount > 0 && (
                  <div className="icon__counter" role="status">
                    <span style={{ fontSize: getFontSize(likedProductsCount) }}>
                      {likedProductsCount}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>

          <div className="icon">
            <Link
              className="icon__link"
              to="cart"
              onClick={() => toggleMenu(false)}
              tabIndex={isMenuOpened ? 0 : -1}
              aria-label={`Shopping cart${cartProductsCount > 0 ? `, ${cartProductsCount} items` : ''}`}
            >
              <div className="icon__image">
                <Icon width={18} height={18} type="cart" />

                {cartProductsCount > 0 && (
                  <div className="icon__counter" role="status">
                    <span style={{ fontSize: getFontSize(cartProductsCount) }}>
                      {cartProductsCount}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </FocusTrap>
  );
};
