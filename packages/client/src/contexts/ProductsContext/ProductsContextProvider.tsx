import { FC, ReactNode, useMemo, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useLikedProducts } from '../../hooks/useLikedProducts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { SortType } from '../../hooks/useProductLoader';
import { Product } from '../../types/Product';
import { ProductsContext } from './ProductsContext';

interface Props {
  children: ReactNode;
}

export const ProductsContextProvider: FC<Props> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useLocalStorage('limit', 16);
  const [sortBy, setSortBy] = useState<SortType>('newest');

  const {
    cart,
    addProduct: addProductToCart,
    deleteProduct: deleteProductFromCart,
    clearCart: deleteAllProductsFromCart,
    totalItems: cartProductsCount,
  } = useCart();

  const {
    likedProducts,
    toggleLike: toggleLikeProduct,
    totalLiked: likedProductsCount,
  } = useLikedProducts();

  const value = useMemo(
    () => ({
      total,
      limit,
      sortBy,
      cart,
      likedProducts,
      products,
      isLoaded,
      cartProductsCount,
      likedProductsCount,
      setTotal,
      setLimit,
      setSortBy,
      addProductToCart,
      deleteProductFromCart,
      deleteAllProductsFromCart,
      toggleLikeProduct,
      setProducts,
      setIsLoaded,
    }),
    [
      total,
      limit,
      sortBy,
      cart,
      likedProducts,
      products,
      isLoaded,
      cartProductsCount,
      likedProductsCount,
      setLimit,
      addProductToCart,
      deleteProductFromCart,
      deleteAllProductsFromCart,
      toggleLikeProduct,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
