import React, { ReactNode } from 'react';
import { ToastConfigParams } from 'react-native-toast-message';
import styled from 'styled-components/native';

import { useTheme } from '@/libs/hooks';

import { Text } from './text';

export function Toaster(props: ToastConfigParams<any> & { icon: ReactNode }) {
  const theme = useTheme();

  return (
    <ToasterWrapper>
      {props.icon}
      <Text size="text-xs" color={theme.colors.Neutral[900]}>
        {props.text1}
      </Text>
    </ToasterWrapper>
  );
}

const ToasterWrapper = styled.View`
  padding: 8px 12px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.Neutral['200']};
  align-items: center;
  gap: 8px;
  flex-direction: row;
  margin: 0px 24px;
`;
