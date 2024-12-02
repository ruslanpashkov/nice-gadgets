import { FC } from 'react';
import { To } from 'react-router';
import { Link } from 'react-router-dom';
import { scrollToTopDefault } from '../../helpers/ScrollToTop';
import { Container } from '../Container';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import './Footer.scss';

export interface ExternalLink {
  id: number;
  name: string;
  link: To;
}

export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: 1,
    name: 'GitHub',
    link: 'https://github.com/ruslanpashkov/nice-gadgets',
  },
  {
    id: 2,
    name: 'Contacts',
    link: 'https://github.com/ruslanpashkov',
  },
  {
    id: 3,
    name: 'Rights',
    link: 'https://github.com/ruslanpashkov/nice-gadgets/blob/main/LICENSE',
  },
];

export const Footer: FC = () => (
  <footer className="Footer">
    <Container>
      <div className="Footer__content">
        <Logo type="footer" />

        <nav className="Footer__nav" aria-label="External links">
          <ul className="Footer__list">
            {EXTERNAL_LINKS.map(({ id, name, link }) => (
              <li key={id} className="Footer__item">
                <Link
                  className="Footer__link"
                  to={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="Footer__button"
          onClick={scrollToTopDefault}
          type="button"
          aria-label="Back to top of page"
        >
          Back to top
          <span className="Footer__button-icon">
            <Icon width={32} height={32} type="arrow-up" />
          </span>
        </button>
      </div>
    </Container>
  </footer>
);
