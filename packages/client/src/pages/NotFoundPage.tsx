import { FC, useEffect } from 'react';
import { NotFound } from '../components/NotFound';
import config from '../config';

const NotFoundPage: FC = () => {
  useEffect(() => {
    document.title = `Not Found | ${config.name}`;
  }, []);

  return <NotFound />;
};

export default NotFoundPage;
