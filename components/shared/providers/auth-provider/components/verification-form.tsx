import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import z from 'zod';

import { VerificationType } from '@/components/features/auth/types';
import { Button, StyledButton } from '@/components/shared/ui/button';
import { Icon } from '@/components/shared/ui/icon';
import { ControlledInput } from '@/components/shared/ui/input';
import { Text } from '@/components/shared/ui/text';
import { components } from '@/libs/api';

import { VerificationFormProps } from '../types';

const verificationMap: Record<
  VerificationType,
  { label: string; showResend: boolean; startIcon: React.ReactNode }
> = {
  EMAIL: {
    showResend: true,
    label: 'Please provide the code sent to your email',
    startIcon: <Icon name="alternate-email" family="MaterialIcons" />,
  },
  TOTP: {
    showResend: false,
    label: 'Please provide the code from your Authenticator app',
    startIcon: <Icon name="qrcode" family="AntDesign" />,
  },
};

export function VerificationForm({ types, onSubmit, onSend }: VerificationFormProps) {
  const schema = useMemo(() => {
    const shape: Record<string, z.ZodTypeAny> = {};

    types.forEach((type) => {
      shape[type] = z.string().min(1);
    });

    return z.object(shape);
  }, [types]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ [key in VerificationType]?: string }>({
    mode: 'all',
    resolver: zodResolver(schema),
  });

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
            startAdornment={config.startIcon}
            endAdornment={
              config.showResend &&
              onSend?.[type] && (
                <StyledButton
                  variant="text"
                  style={{ height: 'auto' }}
                  onPress={() => onSend[type]?.()}
                >
                  <Text>Resend</Text>
                </StyledButton>
              )
            }
          />
        );
      })}

      <Button
        disabled={!isValid}
        onPress={handleSubmit((formValues) => {
          const values = Object.entries(formValues).map(([key, value]) => ({
            key,
            value,
          })) as components['schemas']['InputDto'][];

          onSubmit?.(values);
        })}
      >
        Submit
      </Button>
    </View>
  );
}
