import { FC, useEffect } from 'react';
import { Favourites } from '../components/Favourites';
import config from '../config';

const FavouritesPage: FC = () => {
  useEffect(() => {
    document.title = `Favourites | ${config.name}`;
  }, []);

  return <Favourites />;
};

export default FavouritesPage;
