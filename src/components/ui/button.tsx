import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { UiIcon } from '@/components/ui/icon';

const uiButtonVariants = cva(
  [
    'inline-flex hover:cursor-pointer shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'rounded-lg font-sans text-sm font-medium',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none',
    'focus-visible:ring-4',
    'focus-visible:ring-ring/20',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
    'disabled:bg-neutral-200',
    'disabled:text-neutral-500',
    '[&_svg]:pointer-events-none',
    '[&_svg]:size-4',
    '[&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-success-500',
          'text-white',
          'hover:bg-success-700',
          'active:scale-[0.98]',
          'shadow-sm',
          'hover:shadow-md',
        ].join(' '),

        secondary: [
          'bg-secondary-500',
          'text-white',
          'border border-border',
          'hover:bg-neutral-200',
          'shadow-xs',
        ].join(' '),

        outline: [
          'border border-input',
          'bg-background',
          'text-foreground',
          'hover:bg-muted',
          'hover:text-foreground',
        ].join(' '),

        ghost: [
          'bg-transparent',
          'text-foreground',
          'hover:bg-muted',
          'hover:text-foreground',
        ].join(' '),

        link: ['text-success', 'underline-offset-4', 'hover:underline'].join(' '),

        destructive: [
          'bg-destructive',
          'text-white',
          'hover:bg-danger-600',
          'shadow-sm',
        ].join(' '),

        success: [
          'bg-success-500',
          'text-white',
          'hover:bg-success-600',
          'shadow-sm',
        ].join(' '),

        warning: [
          'bg-warning-500',
          'text-black',
          'hover:bg-warning-600',
          'shadow-sm',
        ].join(' '),

        info: [
          'bg-info-500',
          'text-white',
          'hover:bg-info-600',
          'shadow-sm',
        ].join(' '),
      },

      size: {
        default: 'h-11 px-5',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-xl px-10 text-base',
        icon: 'size-11',
      },

      fullWidth: {
        true: 'w-full',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface UiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof uiButtonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconTrailing?: React.ReactNode;
}

const UiButton = React.forwardRef<HTMLButtonElement, UiButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading,
      icon,
      iconTrailing,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const baseClassName = cn(
      uiButtonVariants({
        variant,
        size,
        fullWidth,
      }),
      className
    );

    // If `asChild` is used and the provided child is a single valid element (not a Fragment),
    // clone it and apply props directly so we don't accidentally forward props to a Fragment.
    if (asChild && React.isValidElement(children) && children.type !== React.Fragment) {
      const child = children as React.ReactElement;

      return React.cloneElement(
        child as React.ReactElement<any>,
        {
          ref: ref as React.Ref<any>,
          className: cn(baseClassName, (child.props && (child.props as any).className) || ''),
          'aria-disabled': isDisabled,
          ...props,
        } as any,
        isLoading ? (
          <>
            <UiIcon name="loader" className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon}
            {child.props && (child.props as any).children}
            {iconTrailing}
          </>
        )
      );
    }

    const Comp = (asChild ? Slot : 'button') as React.ElementType;

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(!asChild ? { disabled: isDisabled } : {})}
        className={baseClassName}
        {...props}
      >
        {isLoading ? (
          <>
            <UiIcon name="loader" className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon}
            {children}
            {iconTrailing}
          </>
        )}
      </Comp>
    );
  }
);

UiButton.displayName = 'UiButton';

export { UiButton, uiButtonVariants };