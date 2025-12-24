import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components/native';

import { getTokensQueryOptions } from '@/api/queries/options';
import { getMeQueryOptions, useTokenUpdate } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { Col, Row } from '@/components/shared/ui/flex';
import { Loader } from '@/components/shared/ui/loader';
import { Text } from '@/components/shared/ui/text';

const TokenCurrencyScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const [
    {
      data: { data: user },
    },
    {
      data: { data: tokens },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getTokensQueryOptions()],
  });

  const { submit, isSubmitting } = useTokenUpdate();

  return (
    <>
      {/* Loading Indicator */}
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <Col gap={12}>
          <Text>Your preferred token currency:</Text>

          <CurrencyButton disabled variant="text">
            {user.settings.tokenCurrency}
          </CurrencyButton>
        </Col>

        <Col gap={24}>
          <Text>Select preferred token currency:</Text>

          <Row gap={12} style={{ flexWrap: 'wrap' }}>
            {tokens
              .filter((token) => token !== user.settings.tokenCurrency)
              .map((token) => (
                <CurrencyButton key={token} variant="text" onPress={() => submit({ token })}>
                  {token}
                </CurrencyButton>
              ))}
          </Row>
        </Col>
      </Col>
    </>
  );
});

TokenCurrencyScreen.displayName = 'TokenCurrencyScreen';

export { TokenCurrencyScreen };

const CurrencyButton = styled(Button)`
  padding: 0px 12px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.Neutral[700]};
`;
