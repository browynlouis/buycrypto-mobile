import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { components } from '@/libs/api';
import { Button } from '@/shared/components/ui/button';
import { ControlledInput } from '@/shared/components/ui/input';

import { resetPasswwordSchema } from '../schema/auth.schema';

type ResetPasswordRequestData = components['schemas']['ForgotPasswordResetDto'];

export function ResetPassword({
  onSubmit,
}: {
  onSubmit: (values: ResetPasswordRequestData) => void;
}) {
  const {
    control,
    formState: { isValid },
    ...form
  } = useForm({
    mode: 'all',
    resolver: zodResolver(resetPasswwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleResetPassword = (values: ResetPasswordRequestData) => {
    onSubmit(values);
  };

  return (
    <>
      <View style={{ gap: 24 }}>
        <ControlledInput
          hiddenField
          name="password"
          control={control}
          placeholder="Please enter your password"
        />

        <ControlledInput
          hiddenField
          control={control}
          name="confirmPassword"
          placeholder="Please confirm your password"
        />

        <Button disabled={!isValid} onPress={() => handleResetPassword(form.getValues())}>
          Submit
        </Button>
      </View>
    </>
  );
}
