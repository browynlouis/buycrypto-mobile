import React from 'react';
import { View } from 'react-native';

export function BottomScreenWrapper({ children }: { children: React.ReactNode }) {
  return <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>{children}</View>;
}
