import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren<{
  to?: string;
  variant?: 'dark' | 'light' | 'ghost';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>>;

const styles = {
  dark: 'bg-sage text-white shadow-[0_10px_30px_rgba(255,104,70,0.28)] hover:-translate-y-0.5 hover:bg-clay',
  light: 'bg-white text-ink shadow-sm hover:-translate-y-0.5 hover:bg-cream',
  ghost: 'border border-black/15 bg-white/50 text-ink hover:border-black/30 hover:bg-white',
};

export function Button({ children, to, variant = 'dark', className = '', ...props }: Props) {
  const classes = `inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-extrabold transition duration-300 ${styles[variant]} ${className}`;
  if (to) return <Link to={to} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
