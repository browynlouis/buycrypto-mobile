import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { useVerification } from '@/shared/components/providers/auth-provider/hooks';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { forgotPassword, forgotPasswordVerify } from '../api';
import { forgotPasswordSchema } from '../schema';
import { FormError } from '../types';

export type UseForgotPasswordReturn = {
  isSubmitting: boolean;
  submit: (values: any) => void;
  form: UseFormReturn<z.infer<typeof forgotPasswordSchema>>;
};

export function useForgotPassword(): UseForgotPasswordReturn {
  const router = useRouter();
  const { startVerification, endVerification, setIsSubmitting } = useVerification();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  /** -------------------------------
   *  FORGOT PASSWORD MUTATION
   * ------------------------------- */
  const forgotPasswordMutation = $api.useMutation(...forgotPassword, {
    onSuccess: async (data, variables) => {
      startVerification({
        types: ['EMAIL'],
        onSend: {
          EMAIL: () =>
            forgotPasswordMutation.mutate({
              body: form.getValues(),
            }),
        },
        onSubmit: (values) =>
          verifyForgotPasswordMutation.mutate({
            params: {
              query: {
                email: variables.body.email,
              },
            },
            body: {
              token: values['EMAIL']!,
            },
          }),
      });
    },
    onError: (error) => {
      toast().error(error.message);

      if (error.name === UnprocessableEntityException) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  /** -------------------------------
   *  VERIFY FORGOT PASSWORD MUTATION
   * ------------------------------- */
  const verifyForgotPasswordMutation = $api.useMutation(...forgotPasswordVerify, {
    onSuccess: () => {
      endVerification();

      const email = form.getValues('email');

      form.reset();
      router.push(`/(auth)/password/reset?email=${email}`);
    },
    onError(error) {
      toast().error(error.message);
    },
    onSettled: () => setIsSubmitting(false),
  });

  /** -------------------------------
   *  Login Handler
   * ------------------------------- */
  const submit = useCallback(
    (values: any) => forgotPasswordMutation.mutate({ body: values }),
    [forgotPasswordMutation],
  );

  return {
    form,
    submit: submit,
    isSubmitting: forgotPasswordMutation.isPending || verifyForgotPasswordMutation.isPending,
  };
}
