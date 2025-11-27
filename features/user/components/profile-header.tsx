import React from 'react';
import styled from 'styled-components/native';

import { Avatar } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { Text } from '@/shared/components/ui/text';

import { User } from '../types';

export function ProfileHeader({ user }: { user: User }) {
  return (
    <Container>
      <Content>
        <Avatar size={52} />

        <UserInfo>
          <Text size="text-xl">{user.username ?? '--'}</Text>

          <CopyButton size="sm" variant="text" endAdornment={<Icon name="Copy" size={16} />}>
            <Text size="text-sm">{`ID: ${user.uniqueId}`}</Text>
          </CopyButton>
        </UserInfo>
      </Content>
    </Container>
  );
}

/* ---------------------- Styled Components ---------------------- */

const Container = styled.View`
  gap: 24px;
  background-color: transparent;
`;

const Content = styled.View`
  gap: 12px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const UserInfo = styled.View`
  gap: 6px;
  align-items: flex-start;
`;

const CopyButton = styled(Button)`
  opacity: 0.5;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

const BadgeRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;
