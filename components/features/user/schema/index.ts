import z from 'zod';

export const usernameSchema = z.object({
  username: z
    .string()
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-z0-9_-]+$/, 'Only letters, numbers, underscores, and hyphens allowed')
    .transform((val) => val.toLowerCase())
    .refine((val) => !/^[-_]/.test(val), {
      message: 'Username cannot start with a hyphen or underscore',
    })
    .refine((val) => !/[-_]$/.test(val), {
      message: 'Username cannot end with a hyphen or underscore',
    })
    .refine((val) => !/[-_]{2,}/.test(val), {
      message: 'Username cannot contain consecutive hyphens or underscores',
    }),
});
