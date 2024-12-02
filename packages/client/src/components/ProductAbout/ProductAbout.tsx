import { FC } from 'react';
import { capitalize } from '../../helpers/capitalize';
import { getValidFields } from '../../helpers/getValidFields';
import type { ProductInfo } from '../../types/Product';
import './ProductAbout.scss';

interface ProductAboutProps {
  product: ProductInfo;
}

export const ProductAbout: FC<ProductAboutProps> = ({ product }) => (
  <article className="ProductAbout">
    <div className="ProductAbout__content">
      <section className="ProductAbout__about-info">
        <h2 className="ProductAbout__about-title">About</h2>

        <ul className="ProductAbout__about-list">
          {product.descriptions.map(({ title, text }) => (
            <li key={title} className="ProductAbout__about-item">
              <h3 className="ProductAbout__description-title">{title}</h3>

              <ul>
                {text.map((paragraph) => (
                  <li
                    key={paragraph}
                    className="ProductAbout__description-text"
                    role="listitem"
                  >
                    {paragraph}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="ProductAbout__specs-info">
        <h2 className="ProductAbout__specs-title">Tech specs</h2>

        <dl className="ProductAbout__specs-list">
          {getValidFields(product.category).map((key) => {
            const value = product[key];

            return (
              <div key={key} className="ProductAbout__specs-item">
                <dt className="ProductAbout__tech-specs-title">
                  {capitalize(key)}:
                </dt>

                <dd className="ProductAbout__tech-specs-text">
                  {Array.isArray(value) ? value.join(', ') : value}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>
    </div>
  </article>
);
