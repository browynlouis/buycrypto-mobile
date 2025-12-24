import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components/native';

import { getFiatsQueryOptions } from '@/api/queries/options';
import { getMeQueryOptions, useFiatUpdate } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { Col, Row } from '@/components/shared/ui/flex';
import { Loader } from '@/components/shared/ui/loader';
import { Text } from '@/components/shared/ui/text';

const FiatCurrencyScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const [
    {
      data: { data: user },
    },
    {
      data: { data: fiats },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getFiatsQueryOptions()],
  });

  const { submit, isSubmitting } = useFiatUpdate();

  return (
    <>
      {/* Loading Indicator */}
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <Col gap={12}>
          <Text>Your preferred fiat currency:</Text>

          <CurrencyButton disabled variant="text">
            {user.settings.fiatCurrency}
          </CurrencyButton>
        </Col>

        <Col gap={24}>
          <Text>Select preferred fiat currency:</Text>

          <Row gap={12} style={{ flexWrap: 'wrap' }}>
            {fiats
              .filter((fiat) => fiat !== user.settings.fiatCurrency)
              .map((fiat) => (
                <CurrencyButton key={fiat} variant="text" onPress={() => submit({ fiat })}>
                  {fiat}
                </CurrencyButton>
              ))}
          </Row>
        </Col>
      </Col>
    </>
  );
});

FiatCurrencyScreen.displayName = 'FiatCurrencyScreen';

export { FiatCurrencyScreen };

const CurrencyButton = styled(Button)`
  padding: 0px 12px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.Neutral[700]};
`;
