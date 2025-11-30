import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { resetPasswwordSchema } from '@/components/features/auth/schema';
import { FormError } from '@/components/features/auth/types';
import { UnprocessableEntityException } from '@/constants/exceptions';
import { $api, components } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';

import { resetPassword } from '../routes';

export type UseResetPasswordReturn = {
  isSubmitting: boolean;
  form: UseFormReturn<z.infer<typeof resetPasswwordSchema>>;
  submit: (email: string, values: components['schemas']['ForgotPasswordResetDto']) => void;
};

export function useResetPasswordAction(): UseResetPasswordReturn {
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
  const resetPasswordMutation = $api.useMutation(...resetPassword, {
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
    (email: string, values: components['schemas']['ForgotPasswordResetDto']) => {
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
