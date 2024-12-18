import { createContext } from 'react';
import { SortType } from '../../hooks/useProductLoader';
import { CartProduct, Product } from '../../types/Product';

interface Props {
  total: number;
  limit: number;
  sortBy: SortType;
  cart: CartProduct[];
  likedProducts: Product[];
  products: Product[];
  isLoaded: boolean;
  cartProductsCount: number;
  likedProductsCount: number;
  setTotal: (total: number) => void;
  setLimit: (limit: number) => void;
  setSortBy: (sortBy: SortType) => void;
  addProductToCart: (product: Product) => void;
  deleteProductFromCart: (productId: number, fully?: boolean) => void;
  deleteAllProductsFromCart: () => void;
  toggleLikeProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  setIsLoaded: (isLoaded: boolean) => void;
}

export const ProductsContext = createContext<Props>({
  total: 0,
  limit: 16,
  sortBy: 'newest',
  cart: [],
  likedProducts: [],
  products: [],
  isLoaded: false,
  cartProductsCount: 0,
  likedProductsCount: 0,
  setTotal: () => {
    /* empty */
  },
  setLimit: () => {
    /* empty */
  },
  setSortBy: () => {
    /* empty */
  },
  addProductToCart: () => {
    /* empty */
  },
  deleteProductFromCart: () => {
    /* empty */
  },
  deleteAllProductsFromCart: () => {
    /* empty */
  },
  toggleLikeProduct: () => {
    /* empty */
  },
  setProducts: () => {
    /* empty */
  },
  setIsLoaded: () => {
    /* empty */
  },
});
