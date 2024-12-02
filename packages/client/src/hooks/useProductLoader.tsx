import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { getProducts } from '../api/product';
import { useErrorContext } from '../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../contexts/ProductsContext/useProductsContext';
import { ProductType } from '../types/Product';

export type SortType = 'newest' | 'highestPrice' | 'lowestPrice';

export function useProductLoader(productType: ProductType) {
  const {
    sortBy,
    limit,
    setProducts,
    setIsLoaded,
    setTotal,
    setLimit,
    setSortBy,
  } = useProductsContext();

  const { setError, clearError } = useErrorContext();
  const { search } = useLocation();

  const loadProducts = useCallback(async () => {
    try {
      clearError();
      setIsLoaded(false);

      const searchParams = new URLSearchParams(search);

      const paramsPage = Number(searchParams.get('page')) || 1;
      const paramsLimit = Number(searchParams.get('limit')) || limit;
      const paramsSortBy = searchParams.get('sortBy') || sortBy;

      setLimit(limit);
      setSortBy(sortBy);

      const productsFromServer = await getProducts(
        productType,
        paramsPage,
        paramsLimit,
        paramsSortBy as SortType,
      );

      setTotal(productsFromServer.count);
      setProducts(productsFromServer.data);
    } catch (error: unknown) {
      setError(error as Error);
    } finally {
      setIsLoaded(true);
    }
  }, [
    search,
    limit,
    sortBy,
    setProducts,
    setIsLoaded,
    setError,
    clearError,
    setTotal,
    setLimit,
    setSortBy,
    productType,
  ]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { loadProducts };
}
