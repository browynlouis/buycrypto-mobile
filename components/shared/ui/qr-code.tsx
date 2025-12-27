import React from 'react';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';
import styled from 'styled-components/native';

import { useAppTheme } from '../providers/theme-provider/hooks';

export function QrCodeDisplay(props: QRCodeProps) {
  const theme = useAppTheme();

  return (
    <QrCodeWrapper>
      <QRCode
        size={150}
        quietZone={0}
        backgroundColor={theme.colors.Shades.White}
        logoBorderRadius={9999}
        {...props}
      />
    </QrCodeWrapper>
  );
}

const QrCodeWrapper = styled.View`
  width: auto;
  height: auto;
  padding: 12px;
  align-self: center;
  border-radius: 12px;
  background-color: white;
`;
