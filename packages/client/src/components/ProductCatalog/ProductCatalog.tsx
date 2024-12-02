import { FC } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductCatalog.scss';

interface Props {
  products: Product[];
}

export const ProductCatalog: FC<Props> = ({ products }) => (
  <ul className="ProductCatalog">
    {products.map((product) => (
      <li key={product.id}>
        <ProductCard product={product} />
      </li>
    ))}
  </ul>
);
