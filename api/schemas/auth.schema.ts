import { z } from 'zod';

import { countrySchema } from './helpers/country.schema';

const registerSchema = z.object({
  email: z.email(),
  country: countrySchema,
  password: z.string().min(8),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const forgotPasswordSchema = z.object({
  email: z.email(),
});

const resetPasswwordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export { forgotPasswordSchema, loginSchema, registerSchema, resetPasswwordSchema };
