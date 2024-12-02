import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '../Icon';
import { MainButton } from '../MainButton';
import './Modal.scss';

interface Props {
  closeModal: () => void;
}

export const Modal: FC<Props> = ({ closeModal }) => {
  const navigate = useNavigate();

  return (
    <div className="Modal">
      <div className="Modal__content">
        <button className="Modal__close" onClick={closeModal}>
          <Icon type="close" width={16} height={16} />
        </button>

        <div className="Modal__success">
          <Icon type="cart-checkout" width="100%" height="100%" />
        </div>

        <p className="Modal__title">Your order was successfully applied!</p>

        <p className="Modal__message">
          We will contact you as soon as possible.
        </p>

        <MainButton type="button" onClick={() => navigate('/')}>
          Return Home
        </MainButton>
      </div>
    </div>
  );
};
