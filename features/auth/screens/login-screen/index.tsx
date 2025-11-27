import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { queryClient } from '@/shared/components/providers';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';
import {
  TwoFactorAuthRequiredException,
  UnprocessableEntityException,
} from '@/shared/constants/exceptions';

import { getAuth, login } from '../../api';
import { AuthScreenTitle } from '../../components';
import { loginSchema } from '../../schema';
import { useAuthStore } from '../../store';
import { AuthResource, FormError } from '../../types';
import { TwoFactorAuthentication } from './two-fa-auth';

export function LoginScreen() {
  const { setTokens, setAuth } = useAuthStore();
  const [twoFaAuthModal, setTwoFaAuthModal] = useState<boolean>(false);

  const {
    control,
    setError,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, error, reset } = $api.useMutation(...login, {
    async onSuccess({ data }) {
      reset();

      setTokens(data.accessToken, data.refreshToken); // set auth tokens

      const auth = await queryClient.fetchQuery<AuthResource>({
        queryKey: getAuth,
      });

      // Set Auth
      setAuth(auth);
    },
    onError(error) {
      toast().error(error.message);

      /** Meaning two fa is required */
      if (error.name === TwoFactorAuthRequiredException) {
        setTwoFaAuthModal(true);
      }

      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

      <View style={{ gap: 32 }}>
        <AuthScreenTitle title="Hi, Welcome!" subText="Please login to your account" />

        <View style={{ gap: 24 }}>
          <ControlledInput
            name="email"
            control={control}
            placeholder="Your email"
            startAdornment={<Icon name="User" />}
          />

          <ControlledInput
            hiddenField
            name="password"
            control={control}
            placeholder="Your password"
            startAdornment={<Icon name="Lock" />}
          />

          <Link href={'/(auth)/password'}>
            <Text weight={500} size="text-md" align="left" color="link">
              Forgot password?
            </Text>
          </Link>
        </View>

        <Button
          size="md"
          onPress={handleSubmit((values) => {
            mutate({
              body: values,
            });
          })}
          disabled={isPending || !isValid}
        >
          Proceed to login
        </Button>
      </View>

      {/* Two Factor Auth Verification */}

      <TwoFactorAuthentication
        twoFaAuthModal={twoFaAuthModal}
        setTwoFaAuthModal={setTwoFaAuthModal}
        types={error?.details?.['twoFaAuths']!}
      />
    </>
  );
}
