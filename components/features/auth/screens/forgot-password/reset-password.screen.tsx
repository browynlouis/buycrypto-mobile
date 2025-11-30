import { useLocalSearchParams } from 'expo-router';

import { useResetPasswordAction } from '@/api/auth/actions/use-reset-password';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { ControlledInput } from '@/components/shared/ui/input';

import { AuthScreenTitle } from '../../_partials';

export function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  if (!email) throw new Error('Email address not available in query');

  const { submit, isSubmitting, form } = useResetPasswordAction();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <>
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <AuthScreenTitle
          title="Reset your password?"
          subText="Create a new password for your account below"
        />

        <ControlledInput
          hiddenField
          name="password"
          control={control}
          startAdornment={<Icon name="Lock" />}
          placeholder="Please enter your password"
        />

        <ControlledInput
          hiddenField
          control={control}
          name="confirmPassword"
          startAdornment={<Icon name="Lock" />}
          placeholder="Please confirm your password"
        />

        <Button disabled={!isValid} onPress={handleSubmit((values) => submit(email, values))}>
          Submit
        </Button>
      </Col>
    </>
  );
}
