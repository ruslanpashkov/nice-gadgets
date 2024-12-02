import cn from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import 'swiper/css';
import { Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { capitalize } from '../../helpers/capitalize';
import { colors } from '../../helpers/constants/colors';
import { BASE_URL } from '../../helpers/fetchClient';
import { findItemById } from '../../helpers/findItemById';
import { normalizeCapacity } from '../../helpers/normalizeCapacity';
import { Product, ProductInfo } from '../../types/Product';
import { Icon } from '../Icon';
import './ProductDetails.scss';

const TECH_SPEC_OPTIONS: (keyof ProductInfo)[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
];

interface Props {
  product: ProductInfo;
  selectedColor: string;
  selectedCapacity: string;
  setSelectedColor: (color: string) => void;
  setSelectedCapacity: (capacity: string) => void;
}

export const ProductDetails: FC<Props> = ({
  product,
  selectedColor,
  selectedCapacity,
  setSelectedColor,
  setSelectedCapacity,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { cart, likedProducts, addProductToCart, toggleLikeProduct } =
    useProductsContext();

  const navigate = useNavigate();

  const preparedProduct: Product = useMemo(
    () => ({
      id: product.itemId,
      name: product.name,
      fullPrice: product.fullPrice,
      price: product.price,
      image: product.images[0],
      category: product.category,
      capacity: product.capacity,
      screen: product.screen,
      ram: product.ram,
      itemId: product.id,
    }),
    [product],
  );

  const changeColor = (color: string) => {
    setSelectedColor(color);
    navigate(
      `/${product.category}` +
        `/${product.namespace}` +
        `-${product.capacity}` +
        `-${color}`,
    );
  };

  const changeCapacity = (capacity: string) => {
    setSelectedCapacity(capacity);
    navigate(
      `/${product.category}` +
        `/${product.namespace}` +
        `-${capacity}` +
        `-${product.color}`,
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const hasItemInCart = Boolean(findItemById(cart, product.itemId));
  const isLiked = Boolean(findItemById(likedProducts, product.itemId));

  const likeButtonIcon = isLiked ? 'like-filled' : 'like';

  return (
    <article className="ProductDetails">
      <h1 className="ProductDetails__title">{product.name}</h1>

      <section className="ProductDetails__content">
        <Swiper
          className="ProductDetails__slider"
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        >
          {product.images.map((image) => (
            <SwiperSlide key={image} className="ProductDetails__slide">
              <img
                className="ProductDetails__main-image"
                src={`${BASE_URL}/${image}`}
                alt={product.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          className="ProductDetails__thumbs"
          spaceBetween={windowWidth < 640 ? 8 : 16}
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper as never}
          direction={windowWidth < 640 ? 'horizontal' : 'vertical'}
          slidesPerView={product.images.length}
        >
          {product.images.map((image, index) => (
            <SwiperSlide key={image} className="ProductDetails__thumb">
              <img
                className={cn('ProductDetails__thumb-image', {
                  'ProductDetails__thumb-image--active': index === activeSlide,
                })}
                src={`${BASE_URL}/${image}`}
                alt={product.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="ProductDetails__info">
          <span className="ProductDetails__product-id">
            Id: {product.itemId}
          </span>

          <div className="ProductDetails__colors">
            <span className="ProductDetails__colors-title">
              Available colors
            </span>

            <ul className="ProductDetails__colors-list">
              {product.colorsAvailable.map((color) => (
                <li key={color} className="ProductDetails__colors-item">
                  <button
                    type="button"
                    className={cn('ProductDetails__colors-button', {
                      'ProductDetails__colors-button--active':
                        color === selectedColor,
                    })}
                    onClick={() => changeColor(color)}
                    aria-label={`Select ${color} color`}
                  >
                    <div
                      className="ProductDetails__colors-color"
                      style={{
                        backgroundColor: colors[color.toLowerCase()],
                      }}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="ProductDetails__divider"
            style={{ marginBottom: '24px' }}
          />

          <div className="ProductDetails__capacity">
            <span className="ProductDetails__capacity-title">
              Select capacity
            </span>

            <ul className="ProductDetails__capacity-list">
              {product.capacityAvailable.map((capacity) => (
                <li key={capacity} className="ProductDetails__capacity-item">
                  <button
                    type="button"
                    className={cn('ProductDetails__capacity-button', {
                      'ProductDetails__capacity-button--active':
                        capacity === selectedCapacity,
                    })}
                    onClick={() => changeCapacity(capacity)}
                    aria-label={`Select ${normalizeCapacity(capacity)} capacity`}
                  >
                    {normalizeCapacity(capacity)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="ProductDetails__divider"
            style={{ marginBottom: '32px' }}
          />

          <div className="ProductDetails__pricing">
            <p className="ProductDetails__price">{product.price}</p>

            <span className="ProductDetails__full-price">
              {product.fullPrice}
            </span>
          </div>

          <div className="ProductDetails__actions">
            {hasItemInCart ? (
              <button
                type="button"
                className="
                    ProductDetails__actions-button
                    ProductDetails__actions-button--added"
                onClick={() => navigate('/cart')}
                aria-label="Go to cart"
              >
                Added to cart
              </button>
            ) : (
              <button
                type="button"
                className="ProductDetails__actions-button ProductDetails__actions-button--add"
                onClick={() => addProductToCart(preparedProduct)}
                aria-label="Add to cart"
              >
                Add to cart
              </button>
            )}

            <button
              type="button"
              className="ProductDetails__actions-button ProductDetails__actions-button--like"
              onClick={() => toggleLikeProduct(preparedProduct)}
              aria-label="Like product"
            >
              <Icon width={48} height={48} type={likeButtonIcon} />
            </button>
          </div>

          <ul className="ProductDetails__specs-list">
            {TECH_SPEC_OPTIONS.map((key) => {
              const value = product[key];

              return (
                <li key={key} className="ProductDetails__specs-item">
                  <p className="ProductDetails__specs-title">
                    {capitalize(key)}
                  </p>

                  <span className="ProductDetails__specs-text">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </article>
  );
};
