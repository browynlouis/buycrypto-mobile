import React from 'react';
import styled from 'styled-components/native';

import { useTheme } from '@/libs/hooks';
import { Text } from '@/shared/components/ui/text';

import { Icon } from './icon';

export function Badge({
  icon,
  status = 'default',
  children,
}: {
  icon?: React.ReactNode;
  status?: 'error' | 'success' | 'warning' | 'default' | boolean;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  const colorMap = {
    error: theme.colors.Error[500],
    success: theme.colors.Success[500],
    warning: theme.colors.Warning[500],
    default: theme.colors.Neutral[400],
  };

  // ------------------------------
  // BOOLEAN LOGIC
  // true  → success
  // false → error
  // ------------------------------
  const dotColor =
    typeof status === 'boolean' ? (status ? colorMap.success : colorMap.error) : colorMap[status];

  return (
    <BadgeContainer>
      {icon ? (
        <IconWrapper>{icon}</IconWrapper>
      ) : (
        <Icon name="dot-single" family="Entypo" color={dotColor} size={20} />
      )}

      <BadgeText size="text-xs">{children}</BadgeText>
    </BadgeContainer>
  );
}

/* ------------------ Styled Components ------------------ */

const BadgeContainer = styled.View`
  border-radius: 99px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  background-color: ${(props) => props.theme.colors.Neutral[700]};
`;

const IconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const BadgeText = styled(Text)`
  padding-right: 12px;
`;
