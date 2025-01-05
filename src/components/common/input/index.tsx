import * as React from 'react';

import { cn } from '@/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

function Input(
  { className, type, error, fullWidth = true, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 rounded-md border bg-background px-3 py-2 text-base ring-offset-background',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'md:text-sm',
        fullWidth ? 'w-full' : 'w-auto',
        error ? 'border-destructive focus-visible:ring-destructive' : 'border-input',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export default React.forwardRef<HTMLInputElement, InputProps>(Input);
