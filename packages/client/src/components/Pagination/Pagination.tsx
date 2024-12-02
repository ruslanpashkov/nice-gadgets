import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getNumbers } from '../../helpers/getNumbers';
import { Icon, IconType } from '../Icon';
import { SearchLink } from '../SearchLink';
import './Pagination.scss';

interface Page {
  page: number;
  type: IconType;
}

export const Pagination: FC = () => {
  const [pages, setPages] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { total, limit } = useProductsContext();

  const currentPage = Number(searchParams.get('page')) || 1;
  const lastPage = pages[pages.length - 1] || 1;

  useEffect(() => {
    setPages(getNumbers(total, limit));
  }, [total, limit]);

  useEffect(() => {
    if (currentPage > lastPage) {
      setSearchParams({ page: `${lastPage}` });
    }
  }, [currentPage, lastPage, setSearchParams]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= lastPage;

  const previousPage: Page = {
    page: isFirstPage ? currentPage : currentPage - 1,
    type: isFirstPage ? 'arrow-left-disabled' : 'arrow-left',
  };

  const nextPage: Page = {
    page: isLastPage ? currentPage : currentPage + 1,
    type: isLastPage ? 'arrow-right-disabled' : 'arrow-right',
  };

  return (
    <nav className="Pagination" aria-label="Pagination Navigation">
      <SearchLink
        className={cn('Pagination__item', {
          'Pagination__item--disabled': isFirstPage,
        })}
        params={{ page: `${previousPage.page}` }}
        aria-label="Previous page"
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : 0}
      >
        <Icon width={30} height={30} type={previousPage.type} />
      </SearchLink>

      <ol className="Pagination__list" role="list">
        {pages.map((page) => (
          <li key={page}>
            <SearchLink
              className={cn('Pagination__item', {
                'Pagination__item--selected': page === currentPage,
              })}
              params={{ page: `${page}` }}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ol>

      <div className="Pagination__count" aria-live="polite">
        {`${currentPage} / ${lastPage}`}
      </div>

      <SearchLink
        className={cn('Pagination__item', {
          'Pagination__item--disabled': isLastPage,
        })}
        params={{ page: `${nextPage.page}` }}
        aria-label="Next page"
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : 0}
      >
        <Icon width={30} height={30} type={nextPage.type} />
      </SearchLink>
    </nav>
  );
};
