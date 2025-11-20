import React from 'react';
import { cn } from '../../utils';
import { BaseProps } from '../../types';

interface TypographyProps extends BaseProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption' | 'mono';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'primary' | 'accent' | 'error';
}

export const Text: React.FC<TypographyProps> = ({ 
  as: Component = 'p', 
  variant = 'body', 
  weight = 'normal', 
  color = 'default',
  className, 
  children,
  ...props 
}) => {
  const variants = {
    h1: 'text-4xl sm:text-5xl tracking-tight leading-tight',
    h2: 'text-3xl sm:text-4xl tracking-tight leading-snug',
    h3: 'text-2xl sm:text-3xl leading-snug',
    h4: 'text-xl sm:text-2xl leading-normal',
    body: 'text-base leading-relaxed',
    'body-sm': 'text-sm leading-relaxed',
    caption: 'text-xs uppercase tracking-wider font-semibold',
    mono: 'font-mono text-sm',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colors = {
    default: 'text-surface-50',
    muted: 'text-surface-400',
    primary: 'text-primary-400',
    accent: 'text-indigo-400',
    error: 'text-red-400',
  };

  return (
    <Component 
      className={cn(variants[variant], weights[weight], colors[color], className)}
      {...props}
    >
      {children}
    </Component>
  );
};