import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api, useApiStore } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { ControlledInput } from '@/shared/components/ui/input';
import { X_AUTH_ID_REQUEST_HEADER, X_VERIFIED_REQUEST_HEADER } from '@/shared/constants/common';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { resetPassword } from '../../api';
import { AuthScreenTitle } from '../../components';
import { resetPasswwordSchema } from '../../schema';
import { FormError } from '../../types';

export function ResetPasswordScreen() {
  const router = useRouter();

  const { context } = useApiStore();

  const {
    control,
    setError,
    getValues,
    formState: { isValid },
    ...form
  } = useForm({
    mode: 'all',
    resolver: zodResolver(resetPasswwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  /** Reset password request */
  const { mutate, isPending, reset } = $api.useMutation(...resetPassword, {
    onSuccess() {
      reset();
      form.reset();

      router.replace('/(auth)/login');
    },

    onError(error) {
      toast().error(error.message);

      // If the error is a validation error, then set the input errors on react-hook-from
      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

      <View style={{ gap: 24 }}>
        <AuthScreenTitle
          title="Reset your password?"
          subText="Create a new password for your account below"
        />

        <ControlledInput
          hiddenField
          name="password"
          control={control}
          placeholder="Please enter your password"
        />

        <ControlledInput
          hiddenField
          control={control}
          name="confirmPassword"
          placeholder="Please confirm your password"
        />

        <Button
          disabled={!isValid}
          onPress={() => {
            const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);
            const verifiedReqId = context.response?.headers.get(X_VERIFIED_REQUEST_HEADER);

            if (isValid && !isPending) {
              mutate({
                headers: {
                  [X_AUTH_ID_REQUEST_HEADER]: authId,
                  [X_VERIFIED_REQUEST_HEADER]: verifiedReqId,
                },
                body: getValues(),
              });
            }
          }}
        >
          Submit
        </Button>
      </View>
    </>
  );
}
