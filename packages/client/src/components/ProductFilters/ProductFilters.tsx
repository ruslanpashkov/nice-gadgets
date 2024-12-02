import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getEnumKeys } from '../../helpers/getEnumKeys';
import type { SortType } from '../../hooks/useProductLoader';
import { Icon } from '../Icon';
import { SearchLink } from '../SearchLink';
import './ProductFilters.scss';

const LIMIT_OPTIONS: number[] = [16, 32, 48];

enum SortByOptions {
  'Newest' = 'newest',
  'Highest price' = 'highestPrice',
  'Lowest price' = 'lowestPrice',
}

export const ProductFilters: FC = () => {
  const [isSortByOpened, setIsSortByOpened] = useState(false);
  const [isLimitOpened, setIsLimitOpened] = useState(false);

  const {
    limit: contextLimit,
    sortBy: contextSortBy,
    setLimit,
    setSortBy,
  } = useProductsContext();
  const [searchParams] = useSearchParams();

  const refSortBy = useRef<HTMLDivElement>(null);
  const refLimit = useRef<HTMLDivElement>(null);

  const parsedLimit = Number(searchParams.get('limit')) || contextLimit;
  const parsedSortBy = searchParams.get('sortBy') || contextSortBy;
  const sortByOptions = getEnumKeys(SortByOptions);

  useEffect(() => {
    setLimit(Number(parsedLimit));
    setSortBy(parsedSortBy as SortType);
  });

  const toggleSortBy = () => {
    setIsSortByOpened((currentStatus) => !currentStatus);
  };

  const toggleLimit = () => {
    setIsLimitOpened((currentStatus) => !currentStatus);
  };

  useEffect(() => {
    const handleDropdownClick = (event: MouseEvent) => {
      if (
        isSortByOpened &&
        refSortBy.current &&
        !refSortBy.current.contains(event.target as Node)
      ) {
        setIsSortByOpened(false);
      }

      if (
        isLimitOpened &&
        refLimit.current &&
        !refLimit.current.contains(event.target as Node)
      ) {
        setIsLimitOpened(false);
      }
    };

    document.addEventListener('click', handleDropdownClick, true);
    return () =>
      document.removeEventListener('click', handleDropdownClick, true);
  }, [isLimitOpened, isSortByOpened]);

  return (
    <section className="ProductFilters" aria-label="Product filters">
      <div ref={refSortBy} className="ProductFilters__sort-by">
        <label id="sort-label" className="ProductFilters__label">
          Sort by
        </label>

        <div
          className="ProductFilters__field"
          role="button"
          tabIndex={0}
          onClick={toggleSortBy}
          onKeyDown={(event) => event.key === 'Enter' && toggleSortBy()}
          aria-expanded={isSortByOpened}
          aria-labelledby="sort-label"
        >
          {sortByOptions.find((key) => SortByOptions[key] === contextSortBy)}

          <div
            className={cn('ProductFilters__arrow', {
              'ProductFilters__arrow--opened': isSortByOpened,
            })}
          >
            <Icon width={16} height={16} type="arrow-up" aria-hidden="true" />
          </div>
        </div>

        <div className="ProductFilters__option">
          <ul
            className={cn('ProductFilters__list', {
              'ProductFilters__list--opened': isSortByOpened,
            })}
            role="listbox"
            aria-labelledby="sort-label"
          >
            {sortByOptions.map((key, index) => (
              <li key={key} className="ProductFilters__item" role="option">
                <SearchLink
                  className="ProductFilters__link"
                  params={{ sortBy: SortByOptions[key], page: '1' }}
                  onKeyDown={(event) => event.key === 'Enter' && toggleSortBy()}
                  onClick={toggleSortBy}
                  onBlur={() =>
                    index === sortByOptions.length - 1 && toggleSortBy()
                  }
                >
                  {key}
                </SearchLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={refLimit} className="ProductFilters__limit">
        <label id="limit-label" className="ProductFilters__label">
          Items on page
        </label>

        <div
          className="ProductFilters__field"
          role="button"
          tabIndex={0}
          onClick={toggleLimit}
          onKeyDown={(event) => event.key === 'Enter' && toggleLimit()}
          aria-expanded={isLimitOpened}
          aria-labelledby="limit-label"
        >
          {contextLimit}

          <div
            className={cn('ProductFilters__arrow', {
              'ProductFilters__arrow--opened': isLimitOpened,
            })}
          >
            <Icon width={16} height={16} type="arrow-up" aria-hidden="true" />
          </div>
        </div>

        <div className="ProductFilters__option">
          <ul
            className={cn('ProductFilters__list', {
              'ProductFilters__list--opened': isLimitOpened,
            })}
            role="listbox"
            aria-labelledby="limit-label"
          >
            {LIMIT_OPTIONS.map((limitOption, index) => (
              <li
                key={limitOption}
                className="ProductFilters__item"
                role="option"
              >
                <SearchLink
                  className="ProductFilters__link"
                  params={{ limit: String(limitOption), page: '1' }}
                  onClick={toggleLimit}
                  onKeyDown={(event) => event.key === 'Enter' && toggleLimit}
                  onBlur={() =>
                    index === LIMIT_OPTIONS.length - 1 && toggleLimit()
                  }
                >
                  {limitOption}
                </SearchLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
