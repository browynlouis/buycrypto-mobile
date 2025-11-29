import { ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/shared/components/ui/text';

export function AuthScreenTitle({ title, subText }: { title: ReactNode; subText?: ReactNode }) {
  return (
    <View
      style={{
        gap: 12,
        flexDirection: 'column',
      }}
    >
      <Text size="display-md" weight={500}>
        {title}
      </Text>
      {subText && <Text size="text-md">{subText}</Text>}
    </View>
  );
}
