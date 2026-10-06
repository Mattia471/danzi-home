import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren<{
  to?: string;
  variant?: 'dark' | 'light' | 'ghost';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>>;

const styles = {
  dark: 'bg-ink text-white hover:bg-moss',
  light: 'bg-white text-ink hover:bg-cream',
  ghost: 'border border-black/15 bg-transparent text-ink hover:bg-white',
};

export function Button({ children, to, variant = 'dark', className = '', ...props }: Props) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-bold transition ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
