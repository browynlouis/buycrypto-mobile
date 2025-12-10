import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { $queryClient } from '@/api/clients/query-client';
import { components } from '@/api/generated/schema';
import { resetPasswwordSchema } from '@/api/schemas/auth.schema';
import { ForgotPasswordResetDto, FormError } from '@/api/types';
import { UnprocessableEntityException } from '@/constants/exceptions';
import { mapServerErrorsToClient, toast } from '@/libs/utils';

export type UseResetPasswordReturn = {
  isSubmitting: boolean;
  form: UseFormReturn<z.infer<typeof resetPasswwordSchema>>;
  submit: (email: string, values: components['schemas']['ForgotPasswordResetDto']) => void;
};

export function useResetPassword(): UseResetPasswordReturn {
  const router = useRouter();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(resetPasswwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  /** Reset password request */
  const resetPasswordMutation = $queryClient.useMutation('post', '/auth/forgot-password/reset', {
    onSuccess() {
      resetPasswordMutation.reset();
      form.reset();

      router.replace('/(auth)/login');
    },

    onError(error) {
      toast().error(error.message);

      // If the error is a validation error, then set the input errors on react-hook-from
      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  /** -------------------------------
   *  Forgot Password Handler
   * ------------------------------- */
  const submit = useCallback(
    (email: string, values: ForgotPasswordResetDto) => {
      return resetPasswordMutation.mutate({
        params: {
          query: { email },
        },
        body: values,
      });
    },
    [resetPasswordMutation],
  );

  return { submit, form, isSubmitting: resetPasswordMutation.isPending };
}
