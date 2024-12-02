import { FC } from 'react';
import { Link } from 'react-router-dom';
import accessories from '../../assets/images/home-category-accessories.png';
import phones from '../../assets/images/home-category-phones.png';
import tablets from '../../assets/images/home-category-tablets.png';
import './Categories.scss';

export interface CategoryData {
  id: number;
  slug: string;
  imageSrc: string;
  alt: string;
  linkTo: string;
  productName: string;
}

const CATEGORIES_DATA: CategoryData[] = [
  {
    id: 1,
    slug: 'phones',
    imageSrc: phones,
    alt: 'Phones',
    linkTo: '/phones',
    productName: 'Mobile Phones',
  },
  {
    id: 2,
    slug: 'tablets',
    imageSrc: tablets,
    alt: 'Tablets',
    linkTo: '/tablets',
    productName: 'Tablets',
  },
  {
    id: 3,
    slug: 'accessories',
    imageSrc: accessories,
    alt: 'Accessories',
    linkTo: '/accessories',
    productName: 'Accessories',
  },
];

interface Props {
  totals: number[];
}

export const Categories: FC<Props> = ({ totals }) => (
  <section className="Categories" aria-labelledby="categories-title">
    <h2 id="categories-title" className="Categories__title">
      Shop by category
    </h2>

    <ul className="Categories__list" role="list">
      {CATEGORIES_DATA.map((category, index) => (
        <li key={category.slug} className="Categories__item">
          <Link
            className="Categories__link"
            to={category.linkTo}
            aria-label={`Shop ${category.productName}`}
            tabIndex={-1}
          >
            <img
              className={`Categories__image Categories__image--${category.slug}`}
              src={category.imageSrc}
              alt={category.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </Link>

          <Link className="Categories__category-name" to={category.linkTo}>
            {category.productName}
          </Link>

          <p className="Categories__info">
            {totals[index] || 0} models available
          </p>
        </li>
      ))}
    </ul>
  </section>
);
