import cn from 'classnames';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './SecondaryButton.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const SecondaryButton: FC<Props> = ({
  className,
  children,
  type = 'button',
  ...props
}) => (
  <button type={type} className={cn('SecondaryButton', className)} {...props}>
    {children}
  </button>
);
