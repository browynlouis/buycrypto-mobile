import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { queryClient, useVerification } from '@/shared/components/providers';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { getAuth, login, loginVerify } from '../../api';
import { loginSchema } from '../../schema';
import { useAuthStore } from '../../store';
import { AuthResource, FormError, VerificationType } from '../../types';

export type UseLoginReturn = {
  isSubmitting: boolean;
  login: (values: any) => void;
  form: UseFormReturn<z.infer<typeof loginSchema>>;
};

export function useLogin(): UseLoginReturn {
  const { setAuth, setTokens } = useAuthStore();
  const { startVerification, closeVerification, setIsSubmitting } = useVerification();

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
        onSend: {
          EMAIL: () =>
            loginMutation.mutate({
              body: form.getValues(),
            }),
        },
        onSubmit: (values) =>
          verifyLogin2faMutation.mutate({
            body: {
              ...form.getValues(),
              twoFaVerification: {
                input: Object.entries(values).map(([key, value]) => ({
                  key: key as VerificationType,
                  value,
                })),
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
      closeVerification();

      /** Set auth tokens */
      setTokens(data.accessToken, data.refreshToken);

      try {
        // Make authenticated request with new tokens
        const auth = await queryClient.fetchQuery<AuthResource>({ queryKey: getAuth });

        // set global auth state
        setAuth(auth);
      } catch (err: any) {
        toast().error(err?.message);
      }
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
    (values: any) => loginMutation.mutate({ body: values }),
    [loginMutation],
  );

  return {
    form,
    login: submit,
    isSubmitting: loginMutation.isPending || verifyLogin2faMutation.isPending,
  };
}
