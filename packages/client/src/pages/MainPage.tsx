import { FC, useEffect } from 'react';
import { Main } from '../components/Main';
import config from '../config';

const MainPage: FC = () => {
  useEffect(() => {
    document.title = config.name;
  }, []);

  return <Main />;
};

export default MainPage;
