import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient } from '@/libs/utils/map-server-errors';
import { toast } from '@/libs/utils/toast';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';
import { VerificationForm } from '../components/verification-form';
import { registerSchema } from '../schema/auth.schema';
import { useAuthStore } from '../store';

export function RegisterScreen() {
  const [emailVerificationModal, setEmailVerificationModal] = useState<boolean>(false);

  const {
    control,
    setError,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending, variables } = $api.useMutation('post', '/auth/register', {
    onSuccess() {
      /**
       * We toggle the modal open on successful registration request
       * Since we expect email verification afterwards
       */
      setEmailVerificationModal(true);
    },
    onError(error) {
      toast().error(error.message);

      if (error.details?.formErrors) {
        mapServerErrorsToClient(setError, error.details?.formErrors);
      }
    },
  });

  const handleRegister = () => {
    if (isValid && !isPending) {
      mutate({
        body: getValues(),
      });
    }
  };

  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle title="Register an account!" subText="Welcome to BuyCrypto" />

      <View style={{ gap: 24 }}>
        <ControlledInput
          name="email"
          control={control}
          placeholder="e.g jon@doe.com"
          startAdornment={<Icon name="User" />}
        />

        <ControlledInput
          hiddenField
          name="password"
          control={control}
          placeholder="e.g Unau!@17"
          startAdornment={<Icon name="Lock" />}
        />

        <ControlledInput
          hiddenField
          control={control}
          name="confirmPassword"
          placeholder="Confirm Password"
          startAdornment={<Icon name="Lock" />}
        />
      </View>

      {/* EMAIL VERIFICATION FORM */}
      <EmailVerification
        email={variables?.body.email ?? ''}
        emailVerificationModal={emailVerificationModal}
        setEmailVerificationModal={setEmailVerificationModal}
      />

      <Button size="md" onPress={handleRegister} disabled={!isValid || isPending}>
        {isPending ? <Spinner /> : 'Create account'}
      </Button>

      <View style={{ gap: 12 }}>
        <Text align="center">Already have an account?</Text>
        <Link href={'/(auth)/login'}>
          <Text align="center" color="link">
            Proceed to login
          </Text>
        </Link>
      </View>
    </View>
  );
}

function EmailVerification({
  email,
  emailVerificationModal,
  setEmailVerificationModal,
}: {
  email: string;
  emailVerificationModal: boolean;
  setEmailVerificationModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { setTokens } = useAuthStore();

  /** Email verification request */
  const emailVerification = $api.useMutation('post', '/auth/email-verification/verify', {
    onSuccess({ data }) {
      setEmailVerificationModal(false);
      setTokens(data.accessToken, data.refreshToken); // set auth tokens

      router.navigate('/(auth)'); // relaod the current route so the tokens are used to load the auth user
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  /** Email verification resend request */
  const emailVerificationResend = $api.useMutation('post', '/auth/email-verification/resend', {
    onSuccess() {
      toast().success('Email verification code resent');
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  return (
    <AppModal
      modalTitle="Verify Your Email"
      visible={emailVerificationModal}
      handleClose={() => setEmailVerificationModal(false)}
    >
      <VerificationForm
        types={['EMAIL']} // Verification type email
        resendRequest={(type) => {
          /** Calls the request to resend request for email verification */
          emailVerificationResend.mutate({
            body: { email },
          });
        }}
        onSubmit={(values) => {
          /** Calls the request to validate the email address with input values from the verification form */
          emailVerification.mutate({
            body: {
              email,
              token: values['EMAIL']!,
            },
          });
        }}
      />
      <Loader isLoading={emailVerification.isPending || emailVerificationResend.isPending} />
    </AppModal>
  );
}
