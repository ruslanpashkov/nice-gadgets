import { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import thirdSlide from '../../assets/images/banner-accessories.webp';
import firstSlide from '../../assets/images/banner-phones.webp';
import secondSlide from '../../assets/images/banner-tablets.webp';
import { Icon } from '../Icon';
import './Slider.scss';

interface SlideData {
  image: string;
  alt: string;
  link: string;
  title: string;
}

const SLIDES: SlideData[] = [
  {
    image: firstSlide,
    alt: 'Latest iPhone models with amazing cameras and powerful performance',
    link: '/phones/apple-iphone-14-pro-512GB-spaceblack',
    title: 'Browse our latest phones collection',
  },
  {
    image: secondSlide,
    alt: 'New iPad collection featuring stunning displays and powerful processors',
    link: '/tablets/apple-ipad-mini-6th-gen-256gb-pink',
    title: 'Discover our tablets selection',
  },
  {
    image: thirdSlide,
    alt: 'Premium accessories including the latest Apple Watch models',
    link: '/accessories/apple-watch-series-6-44mm-gold',
    title: 'Explore our accessories',
  },
];

export const Slider: FC = () => {
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  }, []);

  return (
    <section
      className="Slider"
      aria-label="Featured Products Carousel"
      role="region"
    >
      <button
        className="Slider__button prev"
        type="button"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <Icon width={32} height={32} type="arrow-left" />
      </button>

      <div className="Slider__slides">
        <Swiper
          ref={swiperRef}
          className="Slider__swiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return `<button class="${className}" aria-label="Go to slide ${index + 1}"></button>`;
            },
          }}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          }}
        >
          {SLIDES.map((slide, index) => (
            <SwiperSlide key={slide.link}>
              <Link
                to={slide.link}
                className="Slider__link"
                aria-label={slide.title}
              >
                <img
                  className="Slider__image"
                  src={slide.image}
                  alt={slide.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                <span className="sr-only">{slide.title}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        className="Slider__button next"
        type="button"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <Icon width={32} height={32} type="arrow-right" />
      </button>
    </section>
  );
};
