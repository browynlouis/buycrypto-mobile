import React, { useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { register } from '../../api';
import { AuthScreenTitle } from '../../components';
import { FormError } from '../../types';
import { EmailVerification } from './email-verification';
import { RegistrationFormContext } from './form-provider/registration-form-provider';

export function CredentialsFormScreen() {
  const [emailVerificationModal, setEmailVerificationModal] = useState<boolean>(false);

  const { control, setError, getValues, handleSubmit } = useFormContext<RegistrationFormContext>();

  const { isValid, errors, isDirty } = useFormState({ control });

  const { mutate, isPending, reset } = $api.useMutation(...register, {
    onSuccess() {
      reset();
      /**
       * We toggle the modal open on successful registration request
       * Since we expect email verification afterwards
       */
      setEmailVerificationModal(true);
    },
    onError(error) {
      toast().error(error.message);

      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

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
        </View>

        <Button
          size="md"
          disabled={!isValid || isPending}
          onPress={handleSubmit((values) =>
            mutate({
              body: values,
            }),
          )}
        >
          Create account
        </Button>
      </View>

      {/* EMAIL VERIFICATION FORM */}
      <EmailVerification
        emailVerificationModal={emailVerificationModal}
        setEmailVerificationModal={setEmailVerificationModal}
      />
    </>
  );
}
