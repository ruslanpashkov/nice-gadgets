import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import './Logo.scss';

interface Props {
  type: 'header' | 'footer';
}

export const Logo: FC<Props> = ({ type }) => (
  <Link
    className={cn('Logo', `Logo--${type}`)}
    to="/"
    aria-label="Go to homepage"
  >
    <Icon width="100%" height="100%" type="logo" />
  </Link>
);
