import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { getAuth, login, loginVerify } from '@/api/auth/routes';
import { loginSchema } from '@/components/features/auth/schema';
import { Auth, FormError } from '@/components/features/auth/types';
import { useVerificationContext } from '@/components/shared/providers/auth-provider/hooks';
import { queryClient } from '@/components/shared/providers/query-provider';
import { UnprocessableEntityException } from '@/constants/exceptions';
import { $api, components } from '@/libs/api';
import { useAuthStore } from '@/libs/store';
import { mapServerErrorsToClient, toast } from '@/libs/utils';

export type UseLoginReturn = {
  isSubmitting: boolean;
  submit: (values: any) => void;
  form: UseFormReturn<z.infer<typeof loginSchema>>;
};

export function useLoginAction(): UseLoginReturn {
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
  const loginMutation = $api.useMutation(...login, {
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
  const verifyLogin2faMutation = $api.useMutation(...loginVerify, {
    onSuccess: async ({ data }) => {
      endVerification();

      /** Set auth tokens */
      setAuthTokens(data.accessToken, data.refreshToken);

      try {
        // Make authenticated request with new tokens (gotten from the middleware)
        const auth = await queryClient.fetchQuery<Auth>({ queryKey: getAuth });

        // set global auth state if successuful
        setAuth(auth);
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
    (values: components['schemas']['LoginDto']) => loginMutation.mutate({ body: values }),
    [loginMutation],
  );

  return {
    form,
    submit: submit,
    isSubmitting: loginMutation.isPending || verifyLogin2faMutation.isPending,
  };
}
