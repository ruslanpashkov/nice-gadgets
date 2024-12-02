import { FC } from 'react';
import { Link, LinkProps, useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../../helpers/SearchHelper';

interface Props extends Omit<LinkProps, 'to'> {
  params: SearchParams;
  preserveParams?: boolean;
}

export const SearchLink: FC<Props> = ({
  className,
  children,
  params,
  preserveParams = true,
  ...props
}) => {
  const [searchParams] = useSearchParams();

  const searchString = preserveParams
    ? getSearchWith(searchParams, params)
    : getSearchWith(new URLSearchParams(), params);

  return (
    <Link to={{ search: searchString }} className={className} {...props}>
      {children}
    </Link>
  );
};
