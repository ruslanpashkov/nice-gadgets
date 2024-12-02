import { useCallback } from 'react';
import { calculateQuantity } from '../helpers/calculateQuantity';
import { findItemById } from '../helpers/findItemById';
import { CartProduct, Product } from '../types/Product';
import { useLocalStorage } from './useLocalStorage';

export function useCart() {
  const [cart, setCart] = useLocalStorage<CartProduct[]>('cart', []);

  const addProduct = useCallback(
    (product: Product) => {
      setCart((currentCart: CartProduct[]) => {
        const foundProduct = findItemById(currentCart, product.id);
        if (foundProduct) {
          return currentCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...currentCart, { ...product, quantity: 1 }];
      });
    },
    [setCart],
  );

  const deleteProduct = useCallback(
    (productId: number, fully: boolean = false) => {
      setCart((currentCart: CartProduct[]) => {
        return currentCart
          .map((item) => {
            if (item.id === productId) {
              return fully || item.quantity === 1
                ? null
                : { ...item, quantity: item.quantity - 1 };
            }
            return item;
          })
          .filter(Boolean);
      });
    },
    [setCart],
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, [setCart]);

  return {
    cart,
    addProduct,
    deleteProduct,
    clearCart,
    totalItems: calculateQuantity(cart),
  };
}
