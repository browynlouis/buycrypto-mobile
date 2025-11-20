import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { forgotPassword } from '../../api';
import { AuthScreenTitle } from '../../components';
import { forgotPasswordSchema } from '../../schema';
import { FormError } from '../../types';
import { VerifyRequest } from './verify-request';

/**
 * This component is reponsible for the 'Forgot Password' flow for a user
 * The flow consist of three (3) steps
 *  - The Request: The user triggers a request to reset their password by providing their email
 *
 *  - The Verification: A verification is sent to the user to provide to verify the forgot password request (if successful, returns a header ```x-verified-header```)
 *
 */
export function ForgotPasswordScreen() {
  const router = useRouter();
  // We will use a single page for the entire request flow
  // So we set up a modal state capable of switching into the right context
  const [modal, setModal] = useState<boolean>(false);

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
  const { mutate, isPending } = $api.useMutation(...forgotPassword, {
    onSuccess() {
      // Set the modal value to 'verify' to trigger the verification screen
      setModal(true);

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

  /**
   * Step 1 Initiates the forgot password request
   * @function
   *
   */
  const handleForgotPassword = () => {
    if (isValid && !isPending) {
      mutate({
        body: getValues(),
      });
    }
  };

  return (
    <>
      {/* Displays a loading indicator for ongoing requests */}
      <Loader isLoading={isPending} />

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
        <Button size="md" onPress={handleForgotPassword} disabled={!isValid || isPending}>
          Submit
        </Button>

        <Text color="link" onPress={() => router.back()} align="center">
          Back to login?
        </Text>
      </View>

      {/* Modals for Step 2  */}
      <VerifyRequest verificationModal={modal} setVerificationModal={setModal} />
    </>
  );
}
