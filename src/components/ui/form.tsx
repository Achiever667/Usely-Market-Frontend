'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/lib/utils';

const UiForm = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  required?: boolean;
};

const UiFormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

function UiFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ required, ...props }: ControllerProps<TFieldValues, TName> & { required?: boolean }) {
  return (
    <UiFormFieldContext.Provider value={{ name: props.name, required }}>
      <Controller {...props} />
    </UiFormFieldContext.Provider>
  );
}

const UiFormItemContext = React.createContext<{ id: string }>(
  {} as { id: string }
);

const useUiFormField = () => {
  const fieldContext = React.useContext(UiFormFieldContext);
  const itemContext = React.useContext(UiFormItemContext);

  const { getFieldState } = useFormContext();

  const formState = useFormState({
    name: fieldContext.name,
  });

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useUiFormField should be used within <UiFormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    required: fieldContext.required,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

function UiFormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId();

  return (
    <UiFormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        {...props}
      />
    </UiFormItemContext.Provider>
  );
}

function UiFormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId, required } = useUiFormField();

  return (
    <LabelPrimitive.Root
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      className={cn(
        'text-body font-medium text-foreground',
        'data-[error=true]:text-danger-500',
        className
      )}
      {...props}
    >
      {props.children}
      {required && <span className="ml-1 text-danger-500">*</span>}
    </LabelPrimitive.Root>
  );
}

const UiFormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useUiFormField();

  return (
    <Slot
      ref={ref}
      data-slot="form-control"
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      {...props}
    />
  );
});
UiFormControl.displayName = 'UiFormControl';

function UiFormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useUiFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

function UiFormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useUiFormField();

  const body = error ? String(error?.message ?? '') : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      aria-live="polite"
      className={cn(
        'text-[14px] font-medium font-poppins text-danger-500 transition-opacity duration-200',
        className
      )}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  UiForm,
  UiFormControl,
  UiFormDescription,
  UiFormField,
  UiFormItem,
  UiFormLabel,
  UiFormMessage,
  useUiFormField,
};