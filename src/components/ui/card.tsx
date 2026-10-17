import * as React from 'react';
import { cn } from '@/lib/utils';

export interface UiCardProps extends React.ComponentProps<'div'> {
  unstyled?: boolean;
}

function UiCard({ className, unstyled = false, ...props }: UiCardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Only apply these decorative styles if unstyled is false
        !unstyled && 'rounded-2xl border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function UiCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  );
}

function UiCardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('font-semibold leading-none font-barlow', className)}
      {...props}
    />
  );
}

function UiCardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function UiCardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  );
}

function UiCardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export {
  UiCard,
  UiCardContent,
  UiCardDescription,
  UiCardFooter,
  UiCardHeader,
  UiCardTitle,
};
