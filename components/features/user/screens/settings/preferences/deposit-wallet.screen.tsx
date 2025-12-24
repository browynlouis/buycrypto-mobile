import { Suspense } from '@suspensive/react';
import { useSuspenseQueries } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components/native';

import { getWalletsTypeQueryOptions } from '@/api/queries/options';
import { getMeQueryOptions, useDepositWalletUpdate } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Loader } from '@/components/shared/ui/loader';
import { Text } from '@/components/shared/ui/text';

const DepositWalletScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const [
    {
      data: { data: user },
    },
    {
      data: { data: walletTypes },
    },
  ] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getWalletsTypeQueryOptions()],
  });

  const { submit, isSubmitting } = useDepositWalletUpdate();

  return (
    <>
      {/* Loading Indicator */}
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <Col gap={12}>
          <Text>Your preferred deposit wallet:</Text>

          <CurrencyButton disabled variant="text">
            {user.settings.depositWallet}
          </CurrencyButton>
        </Col>

        <Col gap={24}>
          <Text>Select preferred deposit wallet:</Text>

          <Col gap={12} style={{ flexWrap: 'wrap' }}>
            {walletTypes
              .filter((wt) => wt !== user.settings.depositWallet)
              .map((wt) => (
                <CurrencyButton key={wt} variant="text" onPress={() => submit({ type: wt })}>
                  {wt}
                </CurrencyButton>
              ))}
          </Col>
        </Col>
      </Col>
    </>
  );
});

DepositWalletScreen.displayName = 'DepositWalletScreen';

export { DepositWalletScreen };

const CurrencyButton = styled(Button)`
  padding: 0px 12px;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.Neutral[700]};
`;
