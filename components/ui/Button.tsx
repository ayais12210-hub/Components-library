import React from 'react';
import { cn } from '../../utils';
import { Variant, Size } from '../../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
    
    const variants = {
      primary: "bg-primary-600 hover:bg-primary-500 text-white focus:ring-primary-500 shadow-lg shadow-primary-900/20",
      secondary: "bg-surface-700 hover:bg-surface-600 text-surface-50 focus:ring-surface-500",
      outline: "border border-surface-600 hover:bg-surface-800 text-surface-200 focus:ring-surface-500",
      ghost: "hover:bg-surface-800/50 text-surface-300 hover:text-surface-50 focus:ring-surface-500",
      destructive: "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500",
      glass: "bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white shadow-xl",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      xl: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';