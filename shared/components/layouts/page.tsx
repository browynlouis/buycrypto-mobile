import React from 'react';
import { Keyboard, Platform, ViewStyle } from 'react-native';
import GestureRecognizer, { GestureRecognizerProps } from 'react-native-swipe-gestures';
import styled from 'styled-components/native';

import { useTheme } from '../providers/theme-provider/hooks';

interface PageProps {
  children?: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  gesture?: GestureRecognizerProps;
  noScrollView?: boolean;
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Background = styled.View<{ themeColors: string }>`
  flex: 1;
  padding: 18px;
  background-color: ${(props) => props.themeColors};
`;

const FullFlexView = styled.View`
  flex: 1;
  flex-grow: 1;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const DismissKeyboardPressable = styled.Pressable`
  flex: 1;
`;

/**
 * Page
 *
 * A flexible layout component for React Native that handles:
 * - Keyboard avoiding behavior (iOS/Android)
 * - Optional scrollable content
 * - Themed background styling
 * - Optional swipe gestures
 * - Keyboard dismissal on tap outside inputs
 *
 * Props:
 * - `children` – The content to render inside the page.
 * - `scrollable` – If true, enables scrolling for content (default: true).
 * - `style` – Additional styling for the background container.
 * - `gesture` – Optional swipe gesture props (from react-native-swipe-gestures).
 * - `noScrollView` – If true, disables ScrollView and renders a simple flex container.
 *
 * Usage:
 * ```tsx
 * <Page scrollable gesture={{ onSwipeLeft: () => {} }}>
 *   <YourContent />
 * </Page>
 * ```
 */

export function Page({ children, scrollable = true, style, gesture, noScrollView }: PageProps) {
  const theme = useTheme();
  const backgroundColor = theme.colors.Neutral[900];

  const content = noScrollView ? (
    <FullFlexView>{children}</FullFlexView>
  ) : (
    <StyledScrollView
      keyboardShouldPersistTaps="handled"
      scrollEnabled={scrollable}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </StyledScrollView>
  );

  if (!gesture) {
    return (
      <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Background style={style} themeColors={backgroundColor}>
          {content}
        </Background>
      </Container>
    );
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <GestureRecognizer style={{ flex: 1 }} {...gesture}>
        <DismissKeyboardPressable
          onPress={Keyboard.dismiss}
          accessible={false}
          android_disableSound
        >
          <Background style={style} themeColors={backgroundColor}>
            {content}
          </Background>
        </DismissKeyboardPressable>
      </GestureRecognizer>
    </Container>
  );
}
