import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { useApiStore } from '@/libs/api/store/use-api.store';
import { mapServerErrorsToClient } from '@/libs/utils/map-server-errors';
import { toast } from '@/libs/utils/toast';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';
import { X_AUTH_ID_REQUEST_HEADER, X_VERIFIED_REQUEST_HEADER } from '@/shared/constants/common';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { AuthScreenTitle } from '../components/auth-screen-title';
import { VerificationForm } from '../components/verification-form';
import { forgotPasswordSchema } from '../schema/auth.schema';
import { FormError } from '../types';
import { ResetPassword } from './reset-password';

/**
 * This component is reponsible for the 'Forgot Password' flow for a user
 * The flow consist of three (3) steps
 *  - The Request: The user triggers a request to reset their password by providing their email
 *
 *  - The Verification: A verification is sent to the user to provide to verify the forgot password request (if successful, returns a header ```x-verified-header```)
 *
 *  - The Reset: The user provides a new password and the reset request is sent along with the header property (```x-verified-request```) from [step 2]
 */
export function ForgotPasswordScreen() {
  const { context } = useApiStore();

  // We will use a single page for the entire request flow
  // So we set up a modal state capable of switching into the right context
  const [modal, setModal] = useState<'verify' | 'reset' | null>(null);

  const {
    control,
    setError,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  /** Forgot password request Mutation
   */
  const forgotPassword = $api.useMutation('post', '/auth/forgot-password', {
    onSuccess() {
      // Set the modal value to 'verify' to trigger the verification screen
      setModal('verify');

      // Notify the user that the request was successful
      toast().success('Forgot password request sent');
    },
    onError(error) {
      // Notify the user that the request wasn't successful
      toast().error(error.message);

      // If the error is a validation error, then set the input errors on react-hook-from
      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  /** Verification request */
  const verification = $api.useMutation('post', '/auth/forgot-password/verify', {
    onSuccess() {
      // Set the modal value to 'reset' to trigger the reset screen
      setModal('reset');
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  /** Reset password request */
  const resetPassword = $api.useMutation('post', '/auth/forgot-password/reset', {
    onSuccess() {
      setModal(null);
    },
    onError(error) {
      toast().error(error.message);

      // If the error is a validation error, then set the input errors on react-hook-from
      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  /**
   * Step 1 Initiates the forgot password request
   * @function
   *
   */
  const handleForgotPassword = () => {
    if (isValid && !forgotPassword.isPending) {
      forgotPassword.mutate({
        body: getValues(),
      });
    }
  };

  return (
    <>
      {/* Displays a loading indicator for ongoing requests */}
      <Loader
        isLoading={forgotPassword.isPending || verification.isPending || resetPassword.isPending}
      />

      <View style={{ gap: 32 }}>
        <AuthScreenTitle
          title="Forgot your password?"
          subText="Provide the email associated with your account"
        />

        <ControlledInput
          name="email"
          control={control}
          placeholder="e.g jon@doe.com"
          startAdornment={<Icon name="User" />}
        />

        {/** Step 1 ends -  Submit handler
         *   Initiate's request
         */}
        <Button
          size="md"
          onPress={handleForgotPassword}
          disabled={!isValid || forgotPassword.isPending}
        >
          Submit
        </Button>

        <Link href={'/(auth)/login'} style={{ alignSelf: 'center' }}>
          <Text color="link">Back to login?</Text>
        </Link>
      </View>

      {/* Modals for Step 2 and Step 3 */}

      <>
        {/** Step 2
         *   Forgot Password Request Verification
         */}
        <AppModal
          visible={modal === 'verify'}
          modalTitle="Verify your request"
          handleClose={() => setModal(null)}
        >
          <VerificationForm
            types={['EMAIL']}
            resendRequest={() => {
              /** Recalls the forgot password request to resend verification for cases when verification wasn't received */
              forgotPassword.mutate({ body: getValues() });
            }}
            onSubmit={(values) => {
              const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);

              /** Submits the verification request */

              verification.mutate({
                headers: {
                  [X_AUTH_ID_REQUEST_HEADER]: authId,
                },
                body: {
                  token: values['EMAIL']!,
                },
              });
            }}
          />
        </AppModal>

        {/** Step 3
         *   Reset Password Request
         */}
        <AppModal
          visible={modal === 'reset'}
          modalTitle="Reset your password"
          handleClose={() => setModal(null)}
        >
          <ResetPassword
            onSubmit={(values) => {
              const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);
              const verifiedReqId = context.response?.headers.get(X_VERIFIED_REQUEST_HEADER);

              resetPassword.mutate({
                body: values,
                headers: {
                  [X_AUTH_ID_REQUEST_HEADER]: authId,
                  [X_VERIFIED_REQUEST_HEADER]: verifiedReqId,
                },
              });
            }}
          />
        </AppModal>
      </>
    </>
  );
}
