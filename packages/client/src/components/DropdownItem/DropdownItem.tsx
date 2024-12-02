import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helpers/fetchClient';
import type { Product } from '../../types/Product';
import './DropdownItem.scss';

interface Props {
  product: Product;
  selectProduct: (productName: string) => void;
}

export const DropdownItem: FC<Props> = ({ product, selectProduct }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    selectProduct(product.name);
    navigate(`/${product.category}/${product.itemId}`);
  };

  return (
    <button
      className="DropdownItem"
      onClick={handleItemClick}
      type="button"
      role="option"
      aria-label={`${product.name} - $${product.price}`}
    >
      <img
        className="DropdownItem__image"
        src={`${BASE_URL}/${product.image}`}
        alt={product.name}
        loading="lazy"
      />

      <p className="DropdownItem__description">{product.name}</p>

      <span className="DropdownItem__price">${product.price}</span>
    </button>
  );
};
