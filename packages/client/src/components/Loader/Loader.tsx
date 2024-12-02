import { FC } from 'react';
import './Loader.scss';

interface Props {
  size: number;
}

export const Loader: FC<Props> = ({ size }) => (
  <span
    className="Loader"
    style={{
      width: size,
      height: size,
      borderWidth: size / 6,
    }}
    role="status"
    aria-label="Loading"
  />
);
