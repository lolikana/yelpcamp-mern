import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { User } from './../models';

export const signupSchema = z
  .object({
    username: z.string().min(4, { message: 'An username is required, 4 characters min' }),
    email: z
      .string()
      .min(1, { message: 'An email is required' })
      .email({ message: 'Invalid email address' })
      .refine(value => {
        if (value === 'test@test.com') return false;
        return true;
      }, 'You cannot use this email'),
    password: z
      .string({ required_error: 'A password is required' })
      .trim()
      .refine(
        value => {
          const minChar = value.length >= 4;
          const hasNumber = /\d/.test(value);
          return hasNumber && minChar;
        },
        {
          message: 'You password should have at least 4 alphanumeric characters'
        }
      ),
    confirmPassword: z
      .string({
        required_error: 'Confirm password'
      })
      .trim()
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  });

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'An email is required' })
      .email({ message: 'Invalid email address' })
      .refine(value => {
        if (value === 'test@test.com') return false;
        return true;
      }, 'You cannot login with this email'),
    password: z.string({ required_error: 'A password is required' }).trim()
  })
  .refine(async data => {
    const isUserExist = await User.findOne({ email: data.email });
    if (!isUserExist) return Promise.reject('This email is not in our database.');
    const isSamePassword = await bcrypt.compare(
      data.password,
      isUserExist.password as string
    );
    if (!isSamePassword) return Promise.reject('Wrong password');

    return Promise.resolve(true);
  });

export const campgroundSchema = z.object({
  title: z.string().min(1, { message: 'A title is required' }),
  location: z.string().min(1, { message: 'A title is required' }),
  description: z.string().min(1, { message: 'A title is required' }),
  price: z.string().min(1, { message: 'A title is required' })
});
