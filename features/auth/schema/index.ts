import { z } from 'zod';

import { $fetchApi } from '@/libs/api';

const registerSchema = z
  .object({
    email: z.email(),
    country: z.string(),
    password: z.string().min(8),
  })
  .superRefine(async (formData, ctx) => {
    const { data } = await $fetchApi.GET('/metadata/config/countries');

    const countries = data?.data ?? [];

    const isSupported = countries.some((country) => country.code === formData.country);

    if (!isSupported) {
      ctx.addIssue({
        path: ['country'],
        code: 'custom',
        message: 'The selected country is not supported',
      });
    }
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
