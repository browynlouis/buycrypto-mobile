import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';

import { VerificationType } from '../types';

type FormValues = {
  [key in VerificationType]?: string;
};

const verificationMap: Record<
  VerificationType,
  { label: string; startIcon: React.ReactNode; showResend?: boolean; helperText?: string }
> = {
  EMAIL: {
    label: 'Please provide the code sent to your email',
    startIcon: <Icon name="alternate-email" family="MaterialIcons" />,
    showResend: true,
  },
  SMS: {
    label: 'Please provide the code sent to your phone',
    startIcon: <Icon name="Call" />,
    showResend: true,
  },
  TOTP: {
    label: 'Please provide the code from your Authenticator app',
    startIcon: <Icon name="qrcode" family="AntDesign" />,
  },
};

type Props = {
  types: VerificationType[];
  onSubmit?: (value: FormValues) => void;
  resendRequest?: (type: VerificationType) => void;
};

export function VerificationForm({ types, onSubmit, resendRequest }: Props) {
  const { control, handleSubmit } = useForm<FormValues>();

  const defaultOnSubmit: SubmitHandler<FormValues> = (values) => {};

  const defaultResendRequest = (type: VerificationType) => {};

  const submitHandler = onSubmit || defaultOnSubmit;
  const resendHandler = resendRequest || defaultResendRequest;

  return (
    <View style={{ gap: 24 }}>
      {types.map((type) => {
        const config = verificationMap[type];

        if (!config) return null;

        return (
          <ControlledInput
            key={type}
            name={type}
            control={control}
            label={config.label}
            helperText={config.helperText}
            startAdornment={config.startIcon}
            endAdornment={
              config.showResend && (
                <Button
                  variant="text"
                  style={{ height: 'auto' }}
                  onPress={() => resendHandler(type)}
                >
                  Resend
                </Button>
              )
            }
          />
        );
      })}

      <Button onPress={handleSubmit(submitHandler)}>Submit</Button>
    </View>
  );
}
