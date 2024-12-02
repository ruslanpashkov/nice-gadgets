import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '../Icon';
import './BackButton.scss';

export const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <button
      className="BackButton"
      onClick={() => navigate(-1)}
      type="button"
      aria-label="Go back to previous page"
    >
      <Icon width={16} height={16} type="arrow-left" />

      <span className="BackButton__text">Back</span>
    </button>
  );
};
