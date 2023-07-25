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
