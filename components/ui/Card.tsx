import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = 'default', hover = false, ...props }, ref) => {
  const variants = {
    default: 'bg-white rounded-xl shadow-md border border-gray-100',
    elevated: 'bg-white rounded-xl shadow-elevated border border-gray-100',
    outlined: 'bg-white rounded-xl border-2 border-gray-200',
    gradient: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl shadow-lg',
  };

  const hoverStyles = hover 
    ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1' 
    : '';

  return (
    <div
      ref={ref}
      className={cn(variants[variant], hoverStyles, 'p-6', className)}
      {...props}
    />
  );
});

Card.displayName = 'Card';

export default Card;

