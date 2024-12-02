import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { useErrorContext } from '../../contexts/ErrorContext/useErrorContext';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { getClassName } from '../../helpers/getClassName';
import { getSlidesPerView } from '../../helpers/getSliderPerView';
import type { Product } from '../../types/Product';
import { Icon } from '../Icon';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard/ProductCard';
import './Recommendations.scss';

interface Props {
  title: string;
  products: Product[];
}

export const Recommendations: FC<Props> = ({ title, products }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(
    getSlidesPerView(window.innerWidth),
  );

  const { isLoaded } = useProductsContext();
  const { error } = useErrorContext();

  const normalizedClassName = getClassName(title);
  const hasProducts = products.length > 0;

  const handleResize = useCallback(() => {
    setSlidesPerView(getSlidesPerView(window.innerWidth));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleSwiperChange = useCallback((swiper: Swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  const shouldShowError = Boolean(error);
  const shouldShowLoader = !error && !isLoaded;

  return (
    <section
      className="Recommendations"
      aria-label={`${title} Recommendations`}
    >
      <header className="Recommendations__heading">
        <h2 className="Recommendations__title">{title}</h2>

        {hasProducts && (
          <div
            className="Recommendations__controllers"
            role="group"
            aria-label="Slider controls"
          >
            <button
              type="button"
              className={cn(
                'Recommendations__button',
                `prev__${normalizedClassName}`,
                { 'Recommendations__button--disabled': isBeginning },
              )}
              aria-label="Previous slide"
              disabled={isBeginning}
            >
              <Icon
                width={32}
                height={32}
                type={isBeginning ? 'arrow-left-disabled' : 'arrow-left'}
              />
            </button>

            <button
              type="button"
              className={cn(
                'Recommendations__button',
                `next__${normalizedClassName}`,
                { 'Recommendations__button--disabled': isEnd },
              )}
              aria-label="Next slide"
              disabled={isEnd}
            >
              <Icon
                width={32}
                height={32}
                type={isEnd ? 'arrow-right-disabled' : 'arrow-right'}
              />
            </button>
          </div>
        )}
      </header>

      {shouldShowLoader && (
        <div className="Recommendations__loader" role="status">
          <Loader size={50} />
          <span className="sr-only">Loading recommendations...</span>
        </div>
      )}

      {shouldShowError && (
        <div className="Recommendations__error-message" role="alert">
          Something went wrong!
        </div>
      )}

      {hasProducts && (
        <div
          className="Recommendations__slider"
          aria-label={`${title} products carousel`}
        >
          <ReactSwiper
            slidesPerView={slidesPerView}
            spaceBetween={16}
            loop={false}
            navigation={{
              prevEl: `.prev__${normalizedClassName}`,
              nextEl: `.next__${normalizedClassName}`,
            }}
            modules={[Pagination, Navigation]}
            onSlideChange={handleSwiperChange}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              firstSlideMessage: 'This is the first slide',
              lastSlideMessage: 'This is the last slide',
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="Recommendations__slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </ReactSwiper>
        </div>
      )}
    </section>
  );
};
