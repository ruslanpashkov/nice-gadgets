import { FC } from 'react';
import { useNavigate } from 'react-router';
import { MainButton } from '../MainButton';
import { SecondaryButton } from '../SecondaryButton';
import './Error.scss';

const BUTTON_WIDTH = '160px';

interface Props {
  loadData: () => void;
}

export const Error: FC<Props> = ({ loadData }) => {
  const navigate = useNavigate();

  return (
    <div className="Error" role="alert" aria-live="polite">
      <h2 className="Error__message">Something went wrong!</h2>

      <div className="Error__buttons">
        <MainButton
          style={{ width: BUTTON_WIDTH }}
          onClick={loadData}
          type="button"
        >
          Try again
        </MainButton>

        <SecondaryButton
          style={{ width: BUTTON_WIDTH }}
          onClick={() => navigate('/')}
          type="button"
        >
          Return Home
        </SecondaryButton>
      </div>
    </div>
  );
};
