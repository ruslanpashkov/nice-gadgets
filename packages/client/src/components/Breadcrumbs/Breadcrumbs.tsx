import cn from 'classnames';
import { FC } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import './Breadcrumbs.scss';

interface Props {
  productName?: string;
}

export const Breadcrumbs: FC<Props> = ({ productName }) => {
  const { pathname } = useLocation();
  const [category] = pathname.split('/').filter(Boolean);

  return (
    <ol className="Breadcrumbs" aria-label="Breadcrumb">
      <li className="Breadcrumbs__item Breadcrumbs__item--full">
        <Link to="/" aria-label="Home">
          <Icon width={16} height={16} type="home" aria-hidden="true" />
        </Link>

        <Icon width={16} height={16} type="arrow-right" aria-hidden="true" />
      </li>

      <li className="Breadcrumbs__item Breadcrumbs__item--full">
        <Link
          className={cn('Breadcrumbs__crumb', {
            'Breadcrumbs__crumb--active': Boolean(productName),
            'Breadcrumbs__crumb--disabled': !productName,
          })}
          to={`/${category}`}
          tabIndex={productName ? 0 : -1}
          aria-current={!productName ? 'page' : undefined}
        >
          {category}
        </Link>

        {productName && (
          <Icon width={16} height={16} type="arrow-right" aria-hidden="true" />
        )}
      </li>

      {productName && (
        <li className="Breadcrumbs__item">
          <span className="Breadcrumbs__crumb" aria-current="page">
            {productName}
          </span>
        </li>
      )}
    </ol>
  );
};
