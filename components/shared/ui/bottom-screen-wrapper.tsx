import React from 'react';
import { View } from 'react-native';

export function BottomScreenWrapper({ children }: { children: React.ReactNode }) {
  return <View style={{ marginTop: 'auto', paddingTop: 24 }}>{children}</View>;
}
