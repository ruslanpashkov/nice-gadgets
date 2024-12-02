import { FC, useEffect } from 'react';
import { Cart } from '../components/Cart';
import config from '../config';

const CartPage: FC = () => {
  useEffect(() => {
    document.title = `Cart | ${config.name}`;
  }, []);

  return <Cart />;
};

export default CartPage;
