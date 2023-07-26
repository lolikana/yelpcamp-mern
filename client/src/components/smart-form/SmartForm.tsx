import { zodResolver } from '@hookform/resolvers/zod';
import { createElement, isValidElement, ReactElement, useEffect } from 'react';
import { FieldValues, Path, useForm, UseFormProps } from 'react-hook-form';
import { Schema, ZodTypeDef } from 'zod';

import styles from './SmartForm.module.scss';

type TSmartForm<TFormValues extends FieldValues> = {
  cancelLink: string;
  onSubmit: (data: TFormValues) => void;
  children: ReactElement<{ name: string }> | ReactElement<{ name: Path<TFormValues> }>[];
  options?: UseFormProps<TFormValues>;
  validationSchema: Schema<unknown, ZodTypeDef, unknown>;
};

const SmartForm = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
  options,
  children,
  onSubmit,
  validationSchema
}: TSmartForm<TFormValues>) => {
  const resolver = zodResolver(validationSchema);
  const methods = useForm<TFormValues>({ ...options, resolver });

  const {
    handleSubmit,
    reset,
    register,
    resetField,
    formState: { errors, isSubmitSuccessful }
  } = methods;

  useEffect(() => {
    if (!isSubmitSuccessful) return;
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className={styles.form}
      onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      noValidate
    >
      {Array.isArray(children)
        ? children.map(child => {
            if (isValidElement(child) && child.props.name) {
              return createElement(child.type, {
                ...{
                  ...child.props,
                  register: { ...register(child.props.name) },
                  resetField,
                  error: errors[child.props.name]?.message,
                  key: child.props.name
                }
              });
            } else {
              return child;
            }
          })
        : children}
    </form>
  );
};

export default SmartForm;
