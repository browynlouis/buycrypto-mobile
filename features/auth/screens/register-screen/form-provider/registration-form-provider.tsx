import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { registerSchema } from '@/features/auth/schema';

export type RegistrationFormContext = z.infer<typeof registerSchema>;

export function RegistrationFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<RegistrationFormContext>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      country: '',
      password: '',
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
