import React from 'react';
import { cn } from '../../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'outline' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    
    const variants = {
      default: "bg-surface-800/50 border border-surface-700/50 shadow-lg",
      glass: "bg-surface-900/40 backdrop-blur-xl border border-white/5 shadow-xl",
      outline: "bg-transparent border border-surface-700",
      gradient: "bg-gradient-to-br from-surface-800 to-surface-900 border border-surface-700 shadow-lg",
    };

    const paddings = {
      none: "p-0",
      sm: "p-3 sm:p-4",
      md: "p-5 sm:p-6",
      lg: "p-6 sm:p-8",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-xl overflow-hidden transition-all duration-300 hover:border-surface-600", variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 mb-4", className)}>{children}</div>
);

export const CardTitle = ({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("font-semibold leading-none tracking-tight text-lg", className)}>{children}</h3>
);

export const CardDescription = ({ className, children }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-surface-400", className)}>{children}</p>
);

export const CardFooter = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center pt-4 mt-4 border-t border-surface-700/50", className)}>{children}</div>
);