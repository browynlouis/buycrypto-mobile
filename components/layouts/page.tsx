import React from 'react';
import { Keyboard, Platform, ViewStyle } from 'react-native';
import GestureRecognizer, { GestureRecognizerProps } from 'react-native-swipe-gestures';
import styled from 'styled-components/native';

import { useTheme } from '@/libs/hooks';

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
  padding: 16px;
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
