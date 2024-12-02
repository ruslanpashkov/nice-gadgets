import cn from 'classnames';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './MainButton.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const MainButton: FC<Props> = ({
  className,
  children,
  type = 'button',
  ...props
}) => (
  <button type={type} className={cn('MainButton', className)} {...props}>
    {children}
  </button>
);
