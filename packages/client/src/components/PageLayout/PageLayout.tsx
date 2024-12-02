import { FC } from 'react';
import { useErrorContext } from '../../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { Breadcrumbs } from '../Breadcrumbs';
import { Error } from '../Error';
import { Loader } from '../Loader';
import { Pagination } from '../Pagination';
import { ProductCatalog } from '../ProductCatalog';
import { ProductFilters } from '../ProductFilters';
import './PageLayout.scss';

interface Props {
  title: string;
  loadData: () => void;
}

export const PageLayout: FC<Props> = ({ title, loadData }) => {
  const { total, limit, products, isLoaded } = useProductsContext();
  const { error } = useErrorContext();

  const shouldShowError = Boolean(error);
  const shouldShowLoader = !error && !isLoaded;
  const shouldShowEmptyMessage = !error && isLoaded && products.length === 0;
  const shouldShowCatalog = !error && isLoaded && products.length > 0;
  const shouldShowPagination = total / limit > 1;

  return (
    <div className="PageLayout">
      <div className="PageLayout__header">
        <nav className="PageLayout__breadcrumbs">
          <Breadcrumbs />
        </nav>

        <h1 className="PageLayout__title">{title}</h1>

        <p className="PageLayout__models" aria-label="Total models available">
          {total} models
        </p>

        <section className="PageLayout__actions">
          <ProductFilters />
        </section>
      </div>

      {shouldShowError && (
        <div className="PageLayout__error" role="alert">
          <Error loadData={loadData} />
        </div>
      )}

      {shouldShowLoader && (
        <div
          className="PageLayout__loader"
          role="status"
          aria-label="Loading content"
        >
          <Loader size={50} />
        </div>
      )}

      {shouldShowEmptyMessage && (
        <h2 className="PageLayout__empty-message">No products found</h2>
      )}

      {shouldShowCatalog && (
        <section className="PageLayout__catalog" aria-label="Product catalog">
          <ProductCatalog products={products} />
        </section>
      )}

      {shouldShowPagination && (
        <section className="PageLayout__pagination" aria-label="Pagination">
          <Pagination />
        </section>
      )}
    </div>
  );
};
