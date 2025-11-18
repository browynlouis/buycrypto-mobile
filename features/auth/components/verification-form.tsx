import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import z from 'zod';

import { toast } from '@/libs/utils/toast';
import { Button, StyledButton } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { VerificationType } from '../types';

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
  onSubmit?: (value: { [key in VerificationType]?: string }) => void;
  resendRequest?: (type: VerificationType) => void;
};

function buildVerificationSchema(types: VerificationType[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  types.forEach((type) => {
    shape[type] = z.string().min(1);
  });

  return z.object(shape);
}

export function VerificationForm({ types, onSubmit, resendRequest }: Props) {
  if (!types || !types.length) {
    toast().error('2FA required, but no verification mode provided');

    return null;
  }

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ [key in VerificationType]?: string }>({
    mode: 'all',
    resolver: zodResolver(buildVerificationSchema(types)),
  });

  if (!types || !types.length) {
    toast().error('2FA required, but no verification mode provided');

    return null;
  }

  const defaultOnSubmit: SubmitHandler<{ [key in VerificationType]?: string }> = (values) => {};

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
                <StyledButton
                  variant="text"
                  style={{ height: 'auto' }}
                  onPress={() => resendHandler(type)}
                >
                  <Text>Resend</Text>
                </StyledButton>
              )
            }
          />
        );
      })}

      <Button disabled={!isValid} onPress={handleSubmit(submitHandler)}>
        Submit
      </Button>
    </View>
  );
}
