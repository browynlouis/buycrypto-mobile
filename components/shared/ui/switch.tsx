import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useAppTheme } from '../providers/theme-provider/hooks';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  size?: number;
};

export const Switch = ({
  value = false,
  onValueChange,
  disabled = false,
  activeColor,
  inactiveColor,
  thumbColor = '#fff',
  size = 24,
}: SwitchProps) => {
  const theme = useAppTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
      tension: 100,
    }).start();
  }, [value]);

  const trackWidth = size * 2;
  const thumbSize = size * 0.75;

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1.2],
    outputRange: [1.2, trackWidth - thumbSize - 2],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      inactiveColor ?? theme.colors.Neutral[500],
      activeColor ?? theme.colors.Primary[500],
    ],
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: trackWidth,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {},
});
