import React from 'react';

import { useForgotPassword } from '@/api/queries/auth';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { ControlledInput } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';

import { AuthScreenTitle } from '../../_partials';

/**
 * This component is reponsible for the 'Forgot Password' flow for a user
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

        <Button size="md" disabled={!isValid || isSubmitting} onPress={handleSubmit(submit)}>
          Submit
        </Button>
      </Col>
    </>
  );
}
