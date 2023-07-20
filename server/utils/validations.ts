import { z } from 'zod';

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
