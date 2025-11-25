import React from 'react';
import { Animated, ViewStyle } from 'react-native';

import { useTheme } from '@/libs/hooks';

interface SkeletonProps {
  width?: ViewStyle['width'];
  height?: number;
  borderRadius?: number;
}

export function Skeleton({ width, height, borderRadius }: SkeletonProps) {
  const theme = useTheme();
  const animatedValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }),
    ]),
  ).start();

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.Neutral[800], '#212626'],
  });

  return (
    <Animated.View
      style={{
        width: width ?? '100%',
        height: height ?? 24,
        borderRadius: borderRadius ?? 12,
        backgroundColor: backgroundColor ?? '#212626',
      }}
    />
  );
}
