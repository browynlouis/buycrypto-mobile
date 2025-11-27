import React from 'react';
import { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';

import { Icon } from './icon';
import { Text } from './text';

export interface MenuListItemProps {
  title: string;
  data: {
    rightEl?: React.ReactNode;
    leftEl?: React.ReactNode;
    showArrow?: boolean;
    action?: (e?: GestureResponderEvent) => void;
  };
}

export type MenuList = { title: string; data: MenuListItemProps[] };

export function MenuListItem({
  title,
  data: { action, rightEl, leftEl, showArrow = true },
}: MenuListItemProps) {
  return (
    <Container onPress={(e) => action && action(e)}>
      {leftEl && <LeftWrapper>{leftEl}</LeftWrapper>}

      <TextWrapper>
        <Text size="text-md">{title}</Text>
      </TextWrapper>

      {(showArrow || rightEl) && (
        <RightWrapper>
          <RightElement>{rightEl}</RightElement>
          {showArrow && <Icon name="ArrowRight2" size={18} />}
        </RightWrapper>
      )}
    </Container>
  );
}

/*  ------------------------   Styled Components  ------------------------  */

const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const LeftWrapper = styled.View`
  border-radius: 99px;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.View``;

const RightWrapper = styled.View`
  margin-left: auto;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const RightElement = styled.View``;
