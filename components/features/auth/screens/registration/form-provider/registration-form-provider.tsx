import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { registerSchema } from '@/api/schemas/auth.schema';
import { Loader } from '@/components/shared/ui/loader';

export type RegistrationFormContext = z.infer<typeof registerSchema>;

const RegistrationFormProvider = Suspense.with(
  { fallback: <Loader isLoading /> },
  ({ children }: { children: React.ReactNode }) => {
    const form = useForm<RegistrationFormContext>({
      mode: 'all',
      resolver: zodResolver(registerSchema),
      defaultValues: {
        email: '',
        country: '',
        password: '',
      },
    });

    return <FormProvider {...form}>{children}</FormProvider>;
  },
);

RegistrationFormProvider.displayName = 'RegistrationFormProvider';

export { RegistrationFormProvider };
