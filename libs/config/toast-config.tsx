import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';

import { AppTheme } from '@/styles';

import { Icon } from '../../components/shared/ui/icon';
import { Toaster } from '../../components/shared/ui/toaster';

export const toastConfig = (theme: AppTheme): ToastConfig => ({
  success: (props: ToastConfigParams<any>) => (
    <Toaster
      {...props}
      icon={<Icon size="sm" name="TickCircle" color={theme.colors.Success['500']} />}
    />
  ),

  error: (props: ToastConfigParams<any>) => (
    <Toaster
      {...props}
      icon={<Icon size="sm" name="CloseCircle" color={theme.colors.Error['500']} />}
    />
  ),

  info: (props: ToastConfigParams<any>) => (
    <Toaster {...props} icon={<Icon size="sm" name="InfoCircle" />} />
  ),
});
