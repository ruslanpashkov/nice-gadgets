import cn from 'classnames';
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getProductByQuery } from '../../api/product';
import { debounce } from '../../helpers/debounce';
import type { Product } from '../../types/Product';
import { DropdownMenu } from '../DropdownMenu';
import { Icon } from '../Icon';
import './Search.scss';

interface Props {
  debounceTime?: number;
}

export const Search: FC<Props> = ({ debounceTime = 500 }) => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);

  const searchQueryRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(debounce(setAppliedQuery, debounceTime), [
    debounceTime,
  ]);

  const loadProducts = useCallback(async () => {
    if (!appliedQuery.trim()) {
      setProducts([]);
      return;
    }

    try {
      const newProducts = await getProductByQuery(appliedQuery);
      setProducts(newProducts);
      setIsSuggestionsVisible(true);
    } catch (error) {
      console.error('Failed to load products:', error);
      setProducts([]);
    }
  }, [appliedQuery]);

  useEffect(() => {
    loadProducts();
    return () => setProducts([]);
  }, [appliedQuery, loadProducts]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSuggestionsVisible &&
        searchQueryRef.current &&
        !searchQueryRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSuggestionsVisible]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
    applyQuery(value);
    setIsSuggestionsVisible(false);
  };

  const handleProductSelect = useCallback((productName: string) => {
    setQuery(productName);
    setIsSuggestionsVisible(false);
    inputRef.current?.blur();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        loadProducts();
        break;
      case 'Escape':
        setIsSuggestionsVisible(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const handleFocus = () => {
    if (appliedQuery.trim()) {
      loadProducts();
    }
  };

  const isDropdownVisible = appliedQuery.length > 0 && isSuggestionsVisible;

  return (
    <form ref={searchQueryRef} className="Search">
      <div className="Search__content">
        <label className="Search__label" htmlFor="search-input">
          <span className="sr-only">Search products</span>

          <span className="Search__icon">
            <Icon width={16} height={16} type="search" />
          </span>
        </label>

        <input
          ref={inputRef}
          id="search-input"
          className="Search__input"
          name="search"
          placeholder="Search products"
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          aria-label="Search products"
          aria-controls="search-dropdown"
          aria-describedby="search-description"
        />

        {query && (
          <button
            type="button"
            className="Search__clear"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <Icon width={16} height={16} type="close" />
          </button>
        )}

        <span id="search-description" className="sr-only">
          Type to search products. Use arrow keys to navigate suggestions.
        </span>

        <div
          id="search-dropdown"
          className={cn('Search__dropdown', {
            'Search__dropdown--opened': isDropdownVisible,
          })}
          role="listbox"
          aria-label="Search suggestions"
        >
          <DropdownMenu
            products={products}
            selectProduct={handleProductSelect}
          />
        </div>
      </div>
    </form>
  );
};
