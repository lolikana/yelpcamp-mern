import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export interface IFieldWrapper extends IInput {
  children: ReactNode;
}

export interface IInput {
  register?: UseFormRegister<FieldValues>;
  error?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}