import cn from 'classnames';
import { FC } from 'react';
import ArrowLeftIcon from '../../assets/icons/Arrow-left-default.svg?react';
import ArrowRightIcon from '../../assets/icons/Arrow-right-default.svg?react';
import ArrowUpIcon from '../../assets/icons/Arrow-up-default.svg?react';
import CartCheckoutIcon from '../../assets/icons/Cart-checkout.svg?react';
import CartIcon from '../../assets/icons/Cart.svg?react';
import CloseIcon from '../../assets/icons/Close.svg?react';
import FavouritesFilledIcon from '../../assets/icons/Favourites-filled.svg?react';
import FavouritesIcon from '../../assets/icons/Favourites.svg?react';
import HomeIcon from '../../assets/icons/Home.svg?react';
import LogoIcon from '../../assets/icons/Logo.svg?react';
import MenuIcon from '../../assets/icons/Menu.svg?react';
import MinusIcon from '../../assets/icons/Minus.svg?react';
import PlusIcon from '../../assets/icons/Plus.svg?react';
import SearchIcon from '../../assets/icons/Search.svg?react';
import './Icon.scss';

const ICON_COMPONENTS = {
  logo: LogoIcon,
  menu: MenuIcon,
  home: HomeIcon,
  cart: CartIcon,
  'cart-checkout': CartCheckoutIcon,
  like: FavouritesIcon,
  'like-filled': FavouritesFilledIcon,
  plus: PlusIcon,
  'plus-disabled': PlusIcon,
  minus: MinusIcon,
  'minus-disabled': MinusIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-left-disabled': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'arrow-right-disabled': ArrowRightIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-up-disabled': ArrowUpIcon,
  close: CloseIcon,
  'close-disabled': CloseIcon,
  search: SearchIcon,
  'search-disabled': SearchIcon,
} as const;

export type IconType = keyof typeof ICON_COMPONENTS;

interface Props {
  width: number | string;
  height: number | string;
  type: IconType;
}

export const Icon: FC<Props> = ({ width, height, type }) => {
  const IconComponent = ICON_COMPONENTS[type];

  return (
    <div className={cn('Icon', `Icon--${type}`)} style={{ width, height }}>
      <IconComponent aria-hidden="true" />
    </div>
  );
};
