import * as Clipboard from 'expo-clipboard';

import { toast } from '@/libs/utils';

import { Button, ButtonProps } from './ui/button';

export function CopyButton({ onPress, value, ...props }: ButtonProps & { value: string }) {
  const copyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  return (
    <Button
      onPress={() => {
        copyToClipboard(value);

        toast().success('Copied successfully');
      }}
      {...props}
    />
  );
}
