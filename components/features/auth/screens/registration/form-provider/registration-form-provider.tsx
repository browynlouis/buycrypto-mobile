import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';

import { $queryClient } from '@/api/clients/query-client';
import { registerSchema } from '@/api/schemas/auth.schema';
import { Loader } from '@/components/shared/ui/loader';

export type RegistrationFormContext = z.infer<typeof registerSchema>;

const RegistrationFormProvider = Suspense.with(
  { fallback: <Loader isLoading /> },
  ({ children }: { children: React.ReactNode }) => {
    const {
      data: { data: countries },
    } = $queryClient.useSuspenseQuery('get', '/app/metadata/supported-countries');

    const cc = countries.map((c) => c.code);

    const registerSchemaExtended = useMemo(
      () =>
        registerSchema.extend({
          country: z.string().refine((val) => cc.includes(val)),
        }),
      [countries],
    );

    const form = useForm<RegistrationFormContext>({
      mode: 'all',
      resolver: zodResolver(registerSchemaExtended),
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
