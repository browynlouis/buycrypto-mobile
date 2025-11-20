import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient } from '@/libs/utils/map-server-errors';
import { toast } from '@/libs/utils/toast';
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

import { getAuth } from '../../api';
import { AuthScreenTitle } from '../../components/auth-screen-title';
import { loginSchema } from '../../schema/auth.schema';
import { useAuthStore } from '../../store';
import { FormError } from '../../types';
import { TwoFactorAuthentication } from './two-fa-auth';

export function LoginScreen() {
  const router = useRouter();
  const { setTokens } = useAuthStore();
  const [twoFaAuthModal, setTwoFaAuthModal] = useState<boolean>(false);

  const {
    control,
    setError,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, error, reset } = $api.useMutation('post', '/auth/login', {
    async onSuccess({ data }) {
      reset();

      setTokens(data.accessToken, data.refreshToken); // set auth tokens

      await queryClient.fetchQuery({
        queryKey: getAuth,
      });

      // We route the user to the app if login was successful
      router.replace('/(auth)');
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

  const handleLogin = () => {
    if (isValid && !isPending) {
      mutate({
        body: getValues(),
      });
    }
  };

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

        <Button size="md" onPress={handleLogin} disabled={isPending || !isValid}>
          Proceed to login
        </Button>

        <View style={{ gap: 12 }}>
          <Text align="center">Don't have an account yet?</Text>
          <Link href={'/(auth)/register'}>
            <Text align="center" color="link">
              Register an account
            </Text>
          </Link>
        </View>
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
