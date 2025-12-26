import * as Clipboard from 'expo-clipboard';

import { toast } from '@/lib/utils';

import { Button, ButtonProps } from './button';
import { Icon } from './icon';

export function CopyButton({
  onPress,
  value,
  showIcon,
  ...props
}: ButtonProps & { value: string; showIcon?: boolean }) {
  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  return (
    <Button
      onPress={() => {
        copyToClipboard(value);

        toast().success('Copied successfully');
      }}
      endAdornment={showIcon ? <Icon name="Copy" /> : undefined}
      {...props}
    />
  );
}
