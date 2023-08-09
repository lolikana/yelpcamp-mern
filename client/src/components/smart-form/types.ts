import { HTMLInputTypeAttribute, ReactNode } from 'react';
import {
  FieldValues,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue
} from 'react-hook-form';

export interface IFieldWrapper extends Omit<IInput, 'register'> {
  children: ReactNode;
}

export interface IInput {
  register?: UseFormRegister<FieldValues>;
  error?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export interface ITextArea extends Omit<IInput, 'type'> {}

export interface IInputFile extends IInput {
  resetField?: UseFormResetField<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  resetFormThumbnail?: boolean;
}
