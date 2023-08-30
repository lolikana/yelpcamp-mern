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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const checkFileSize = (files: FileList) => {
  return Array.from(files).every(file => {
    return file.size < MAX_FILE_SIZE;
  });
};

function checkFileType(files: FileList) {
  return Array.from(files).every(file => {
    const fileType = file.name.split('.').pop();
    return ACCEPTED_IMAGE_TYPES.some(type => {
      const typeSplit = type.split('/').pop();
      return fileType === typeSplit;
    });
  });
}

export const CampgroundValidation = z.object({
  title: z.string().min(1, { message: 'Enter a title' }),
  location: z.string().min(1, { message: 'Enter a location' }),
  description: z.string().min(1, { message: 'Enter a description' }),
  price: z.number().min(1, { message: 'Enter a price' }),
  images: z
    .custom<FileList>()
    .refine(files => files.length !== 0, {
      message: 'Please, insert at least one image (max 3)'
    })
    .refine(files => checkFileSize(files), {
      message: 'File size must be less than 5mb'
    })
    .refine(files => checkFileType(files), {
      message: 'File type must be .jpg, .jpeg or .png'
    })
});
