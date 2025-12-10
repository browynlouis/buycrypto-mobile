import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { $queryClient } from '@/api/clients/query-client';
import { loginSchema } from '@/api/schemas/auth.schema';
import { FormError, LoginDto } from '@/api/types';
import { useVerificationContext } from '@/components/shared/providers/auth-provider/hooks';
import { queryClient } from '@/components/shared/providers/query-provider';
import { UnprocessableEntityException } from '@/constants/exceptions';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { useAuthStore } from '@/store';

import { getAuthQueryOptions } from '../../options';

export type UseLoginReturn = {
  isSubmitting: boolean;
  submit: (values: any) => void;
  form: UseFormReturn<z.infer<typeof loginSchema>>;
};

export function useLogin(): UseLoginReturn {
  const { setAuth, setAuthTokens } = useAuthStore();
  const { startVerification, endVerification, setIsSubmitting } = useVerificationContext();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  /** -------------------------------
   *  LOGIN MUTATION
   * ------------------------------- */
  const loginMutation = $queryClient.useMutation('post', '/auth/login', {
    onSuccess: async ({ data }) => {
      startVerification({
        types: data.twoFaAuths,
        purpose: 'LOGIN',
        onSend: {
          EMAIL: () =>
            /** Recall login mutation to resend 2fa request */
            loginMutation.mutate({
              body: form.getValues(),
            }),
        },
        onSubmit: (values) =>
          verifyLogin2faMutation.mutate({
            body: {
              ...form.getValues(),
              twoFaVerification: {
                input: values,
              },
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
   *  VERIFY Login 2FA MUTATION
   * ------------------------------- */
  const verifyLogin2faMutation = $queryClient.useMutation('post', '/auth/login/verify', {
    onSuccess: async ({ data }) => {
      endVerification();

      /** Set auth tokens */
      setAuthTokens(data.accessToken, data.refreshToken);

      try {
        // Make authenticated request with new tokens (gotten from the middleware)
        /** Fetch auth user with the new tokens */
        await queryClient.invalidateQueries({
          refetchType: 'all',
          queryKey: getAuthQueryOptions().queryKey,
        });
      } catch (err: any) {
        toast().error('An error occurred! Please try again later');
      }
    },
    onError(error) {
      /** Close verification loader */
      setIsSubmitting(false);

      toast().error(error.message);
    },
  });

  /** -------------------------------
   *  Login Handler
   * ------------------------------- */
  const submit = useCallback(
    (values: LoginDto) => loginMutation.mutate({ body: values }),
    [loginMutation],
  );

  return {
    form,
    submit: submit,
    isSubmitting: loginMutation.isPending || verifyLogin2faMutation.isPending,
  };
}
