import { useCallback } from 'react';
import { findItemById } from '../helpers/findItemById';
import { Product } from '../types/Product';
import { useLocalStorage } from './useLocalStorage';

export function useLikedProducts() {
  const [likedProducts, setLikedProducts] = useLocalStorage<Product[]>(
    'liked',
    [],
  );

  const toggleLike = useCallback(
    (product: Product) => {
      setLikedProducts((current: Product[]) => {
        const foundProduct = findItemById(current, product.id);
        if (foundProduct) {
          return current.filter((item) => item.id !== product.id);
        }
        return [...current, product];
      });
    },
    [setLikedProducts],
  );

  return {
    likedProducts,
    toggleLike,
    totalLiked: likedProducts.length,
  };
}
