import React from 'react';
import Toast from 'react-native-toast-message';

import { useTheme } from '@/libs/hooks';

import { Icon } from '../ui/icon';
import { Toaster } from '../ui/toaster';

export function ToastProvider() {
  const theme = useTheme();

  return (
    <Toast
      swipeable
      config={{
        success: (props) => (
          <Toaster
            {...props}
            icon={<Icon size={16} name="TickCircle" color={theme.colors.Success['500']} />}
          />
        ),
        error: (props) => (
          <Toaster
            {...props}
            icon={<Icon size={16} name="CloseCircle" color={theme.colors.Error['500']} />}
          />
        ),
        info: (props) => <Toaster {...props} icon={<Icon size={16} name="InfoCircle" />} />,
      }}
    />
  );
}
