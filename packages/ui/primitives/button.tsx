import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Loader } from 'lucide-react';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-[#CE52FA] text-primary-foreground hover:bg-accent',
        destructive:
          'bg-destructive text-destructive-foreground hover:text-[#CE52FA] hover:bg-destructive',
        // Passkey-login
          outline: 'border border-input hover:bg-accent hover:text-[#CE52FA]', 
          // Nill
        secondary: 'bg-secondary text-secondary-foreground hover:text-[#CE52FA] hover:bg-secondary',
        ghost: 'hover:bg-accent hover:text-[#CE52FA]',
        link: 'underline-offset-4 hover:underline text-primary hover:text-[#CE52FA]',
        none: '',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);




const loaderVariants = cva('mr-2 animate-spin', {
  variants: {
    size: {
      default: 'h-5 w-5',
      sm: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;

  /**
   * Will display the loading spinner and disable the button.
   */
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
      );
    }

    const isLoading = loading === true;
    const isDisabled = props.disabled || isLoading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isDisabled}
      >
        {isLoading && <Loader className={cn('mr-2 animate-spin', loaderVariants({ size }))} />}
        {props.children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
