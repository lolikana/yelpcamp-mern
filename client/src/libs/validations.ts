import z from 'zod';

export const LoginValidation = z.object({
  email: z
    .string()
    .min(1, { message: 'An email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'You need to enter a password' })
    .trim()
    .min(4, { message: 'Your password should have at least 4 characters' })
});

export const SignupValidation = z
  .object({
    username: z.string().min(1, { message: 'Enter an username' }),
    email: z
      .string()
      .min(1, { message: 'An email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'You need to enter a password' })
      .trim()
      .min(4, { message: 'Your password should have at least 4 characters' }),
    confirmPassword: z
      .string({ required_error: 'You need to confirm your password' })
      .trim()
      .min(1, { message: 'You need to confirm your password' })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match'
  });

export const CampgroundValidation = z.object({
  title: z.string().min(1, { message: 'Enter a title' }),
  location: z.string().min(1, { message: 'Enter a location' }),
  description: z.string().min(1, { message: 'Enter a description' }),
  price: z.string().min(1, { message: 'Enter a price' })
});
