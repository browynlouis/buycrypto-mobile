import React from 'react';

import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';

import { AuthScreenTitle } from '../../components';
import { useForgotPassword } from '../../hooks';

/**
 * This component is reponsible for the 'Forgot Password' flow for a user
 * The flow consist of three (3) steps
 *  - The Request: The user triggers a request to reset their password by providing their email
 *
 *  - The Verification: A verification is sent to the user to provide to verify the forgot password request (if successful, returns a header ```x-verified-header```)
 *
 */
export function ForgotPasswordScreen() {
  const { form, submit, isSubmitting } = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <>
      {/* Displays a loading indicator for ongoing requests */}
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
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
        <Button size="md" disabled={!isValid || isSubmitting} onPress={handleSubmit(submit)}>
          Submit
        </Button>
      </Col>
    </>
  );
}
