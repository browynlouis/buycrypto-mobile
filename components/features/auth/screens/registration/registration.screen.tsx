import React from 'react';

import { useRegistration } from '@/api/queries/auth';
import { Button } from '@/components/shared/ui/button';
import { DescriptionHeader } from '@/components/shared/ui/description-header';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { ControlledInput } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';

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
        <DescriptionHeader title="Register an account!" subText="Welcome to BuyCrypto" />

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
