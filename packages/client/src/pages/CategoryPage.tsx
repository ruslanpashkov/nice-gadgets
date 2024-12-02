import { FC, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import config from '../config';
import { useProductLoader } from '../hooks/useProductLoader';
import { ProductType } from '../types/Product';

interface Props {
  title: string;
  pageTitle: string;
  productType: ProductType;
}

const CategoryPage: FC<Props> = ({ title, productType, pageTitle }) => {
  const { loadProducts } = useProductLoader(productType);

  useEffect(() => {
    document.title = `${pageTitle} | ${config.name}`;
  }, [pageTitle]);

  return <PageLayout title={title} loadData={loadProducts} />;
};

export default CategoryPage;
