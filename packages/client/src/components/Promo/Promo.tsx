import { FC } from 'react';
import '../../styles/swiper.scss';
import { Slider } from '../Slider';
import './Promo.scss';

export const Promo: FC = () => (
  <section className="Promo" aria-label="Promotional Section">
    <h1 className="Promo__title">Welcome to Nice Gadgets store!</h1>

    <div className="Promo__slider" aria-label="Featured Products">
      <Slider />
    </div>

    <nav
      className="swiper-pagination"
      aria-label="Slider Navigation"
      style={{ position: 'static' }}
    />
  </section>
);
