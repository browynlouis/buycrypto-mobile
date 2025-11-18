import { z } from 'zod';

const registerSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export { loginSchema, registerSchema };
