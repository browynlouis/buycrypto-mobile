import React from 'react';
import styled from 'styled-components/native';

import { TokenResource } from '@/api/types';

import { Avatar } from '../avatar';
import { Col, Row } from '../flex';
import { Text } from '../text';

export function TokenCard({
  token,
  symbolOnly,
}: {
  token?: TokenResource & {};
  symbolOnly?: boolean;
}) {
  return (
    <Wrapper gap={12}>
      {/* Image Display */}
      <Row>
        <Avatar size={24} imageSource={{ uri: token?.metadata.icon ?? undefined }} />
      </Row>
      {/* Description */}
      <Col gap={2}>
        <Text size="text-sm" weight={700}>
          {token?.symbol ?? 'USDC'}
        </Text>
        {symbolOnly && <Text size="text-xs">{token?.name ?? 'USDC'}</Text>}
      </Col>
      {/* Valuation */}
      <Row></Row>
    </Wrapper>
  );
}

const Wrapper = styled(Row)`
  border-radius: 12px;
`;
