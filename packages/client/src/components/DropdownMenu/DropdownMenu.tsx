import classNames from 'classnames';
import { FC } from 'react';
import { Product } from '../../types/Product';
import { DropdownItem } from '../DropdownItem';
import './DropdownMenu.scss';

interface Props {
  products: Product[];
  selectProduct: (productName: string) => void;
}

export const DropdownMenu: FC<Props> = ({ products, selectProduct }) => (
  <ul className="DropdownMenu">
    {products.length > 0 ? (
      products.map((product, index) => {
        const isLast = index === products.length - 1;

        return (
          <li
            key={product.id}
            className={classNames('DropdownMenu__item', {
              'DropdownMenu__item--last': isLast,
            })}
          >
            <DropdownItem product={product} selectProduct={selectProduct} />
          </li>
        );
      })
    ) : (
      <li className="DropdownMenu__empty-message">No results found</li>
    )}
  </ul>
);
