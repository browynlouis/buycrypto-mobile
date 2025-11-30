import React from 'react';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';
import styled from 'styled-components/native';

import { useAppTheme } from '../providers/theme-provider/hooks';

export function QrCodeDisplay(props: QRCodeProps) {
  const theme = useAppTheme();

  return (
    <QrCodeWrapper>
      <QRCode
        size={220}
        quietZone={16}
        backgroundColor={theme.colors.Shades.White}
        logoBorderRadius={9999}
        {...props}
      />
    </QrCodeWrapper>
  );
}

const QrCodeWrapper = styled.View`
  align-self: center;
  padding: 16px;
  width: auto;
  height: auto;
`;
