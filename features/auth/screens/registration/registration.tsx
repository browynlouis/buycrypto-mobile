import React from 'react';

import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';

import { AuthScreenTitle } from '../../components';
import { useRegistration } from '../../hooks';

export function RegistrationScreen() {
  const { form, submit, isSubmitting } = useRegistration();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <>
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <AuthScreenTitle title="Register an account!" subText="Welcome to BuyCrypto" />

        <Col gap={24}>
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
        </Col>

        <Button size="md" disabled={!isValid || isSubmitting} onPress={handleSubmit(submit)}>
          Create account
        </Button>
      </Col>
    </>
  );
}
