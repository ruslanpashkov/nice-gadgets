import cn from 'classnames';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { createOrder } from '../../api/order';
import { useProductsContext } from '../../contexts/ProductsContext/useProductsContext';
import { calculatePrice } from '../../helpers/calculatePrice';
import { calculateQuantity } from '../../helpers/calculateQuantity';
import { BASE_URL } from '../../helpers/fetchClient';
import '../../styles/modal.scss';
import { BackButton } from '../BackButton';
import { Icon } from '../Icon';
import { Loader } from '../Loader';
import { Modal } from '../Modal/Modal';
import './Cart.scss';

export const Cart: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    cart,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
  } = useProductsContext();

  const totalPrice = cart.reduce(
    (total, product) => total + calculatePrice(product),
    0,
  );
  const totalQuantity = calculateQuantity(cart);
  const hasItemsInCart = cart.length > 0;

  const checkout = () => {
    setIsModalOpened(true);
    deleteAllProductsFromCart();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      setIsSubmitting(true);

      await createOrder({
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        products: cart,
        totalPrice,
        totalQuantity,
      });

      checkout();
    } catch (error) {
      console.error('Failed to create order', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="Cart" aria-label="Shopping Cart">
      <div
        className={cn('Cart__content', {
          'Cart__content--blur': isModalOpened,
        })}
      >
        <div className="Cart__back">
          <BackButton />
        </div>

        <h1 className="Cart__title">Cart</h1>

        {!hasItemsInCart && (
          <h2 className="Cart__empty-message">Cart is empty now</h2>
        )}

        {hasItemsInCart && (
          <div className="Cart__products">
            <ul className="Cart__list">
              {cart.map((product) => {
                const itemPrice = calculatePrice(product);
                const canIncrement = product.quantity < 99;
                const canDecrement = product.quantity > 1;

                return (
                  <li key={product.id} className="Cart__item">
                    <div className="Cart__row">
                      <button
                        className="Cart__remove-button"
                        onClick={() => deleteProductFromCart(product.id, true)}
                        aria-label={`Remove ${product.name} from cart`}
                        type="button"
                      >
                        <Icon width={16} height={16} type="close-disabled" />
                      </button>

                      <Link
                        to={`/${product.category}/${product.itemId}`}
                        aria-label={product.name}
                      >
                        <img
                          className="Cart__image"
                          src={`${BASE_URL}/${product.image}`}
                          alt={product.name}
                        />
                      </Link>

                      <Link
                        className="Cart__description"
                        to={`/${product.category}/${product.itemId}`}
                      >
                        {product.name}
                      </Link>
                    </div>

                    <div className="Cart__row">
                      <div
                        className="Cart__quantity-selector"
                        role="group"
                        aria-label={`Quantity controls for ${product.name}`}
                      >
                        <button
                          className="Cart__modify-button"
                          disabled={!canDecrement}
                          onClick={() => deleteProductFromCart(product.id)}
                          aria-label="Decrease quantity"
                          type="button"
                        >
                          <Icon
                            width={32}
                            height={32}
                            type={canDecrement ? 'minus' : 'minus-disabled'}
                          />
                        </button>

                        <span className="Cart__quantity">
                          {product.quantity}
                        </span>

                        <button
                          className="Cart__modify-button"
                          disabled={!canIncrement}
                          onClick={() => addProductToCart(product)}
                          aria-label="Increase quantity"
                          type="button"
                        >
                          <Icon
                            width={32}
                            height={32}
                            type={canIncrement ? 'plus' : 'plus-disabled'}
                          />
                        </button>
                      </div>

                      <p className="Cart__price">${itemPrice}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <form className="Cart__form" onSubmit={handleSubmit}>
              <fieldset className="Cart__contact">
                <div className="Cart__form-field">
                  <label className="Cart__form-label" htmlFor="name">
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="Cart__form-input"
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="Cart__form-field">
                  <label className="Cart__form-label" htmlFor="phone">
                    Phone
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="Cart__form-input"
                    required
                    pattern="[0-9]{10,}"
                    placeholder="1234567890"
                  />
                </div>

                <div className="Cart__form-field">
                  <label className="Cart__form-label" htmlFor="address">
                    Address
                  </label>

                  <input
                    id="address"
                    name="address"
                    className="Cart__form-input"
                    required
                    placeholder="1234 Elm Street"
                  />
                </div>
              </fieldset>

              <div className="Cart__checkout">
                <p className="Cart__total-price">${totalPrice}</p>

                <p className="Cart__total">Total for {totalQuantity} items</p>

                <button className="Cart__checkout-button" type="submit">
                  {isSubmitting ? <Loader size={20} /> : 'Checkout'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <CSSTransition
        in={isModalOpened}
        timeout={400}
        classNames="alert"
        unmountOnExit
      >
        <Modal closeModal={() => setIsModalOpened(false)} />
      </CSSTransition>
    </section>
  );
};
