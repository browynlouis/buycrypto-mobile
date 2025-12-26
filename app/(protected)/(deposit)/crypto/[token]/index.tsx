import { Suspense } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { getTokenDataQueryOptions } from '@/api/queries/blockchain';
import { getUserWalleAddresQueryOptions } from '@/api/queries/user';
import { Network, Token } from '@/api/types';
import { Page } from '@/components/shared/layouts/page';
import { useAppTheme } from '@/components/shared/providers/theme-provider/hooks';
import { Avatar } from '@/components/shared/ui/avatar';
import { Button } from '@/components/shared/ui/button';
import { CopyButton } from '@/components/shared/ui/copy-button';
import { Col } from '@/components/shared/ui/flex';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';
import { DataList } from '@/components/shared/ui/list/data-list';
import { Loader } from '@/components/shared/ui/loader';
import { AppModal } from '@/components/shared/ui/modal';
import { Panel } from '@/components/shared/ui/panel.';
import { QrCodeDisplay } from '@/components/shared/ui/qr-code';
import { Text } from '@/components/shared/ui/text';

const DepositViaCryptoPage = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const theme = useAppTheme();
  const { token } = useLocalSearchParams<{ token: Token }>();

  const {
    data: { data },
  } = useSuspenseQuery(
    getTokenDataQueryOptions({
      fetchOptions: {
        params: {
          path: { token },
        },
      },
    }),
  );

  const [showSelection, setShowSelection] = useState<boolean>(false);
  const [network, setNetwork] = useState<Network>(data.networks[0]!.name);

  const { isFetching, data: walletAddress } = useQuery(
    getUserWalleAddresQueryOptions({
      fetchOptions: {
        params: {
          path: { network: network },
        },
      },
      queryClientOptions: {
        enabled: !!network,
      },
    }),
  );

  const address = (walletAddress?.data.address ?? '').toLowerCase();

  return (
    <>
      <Loader isLoading={isFetching} />

      {/* Page Header */}
      <Header
        showBackButton
        title={`Deposit-${token}`}
        rightElement={<Avatar size={24} imageSource={{ uri: data.metadata.icon ?? undefined }} />}
      />

      {/* Main Content */}
      <Page>
        {/* Network select */}

        <Button
          variant="text"
          onPress={() => setShowSelection(!showSelection)}
          endAdornment={<Icon name="ArrowDown2" size={16} />}
        >
          {network ? network.toUpperCase() : 'Select Network'}
        </Button>

        {/* Network Details Display */}

        {address && (
          <Col gap={32}>
            <QrCodeDisplay value={address} />

            <Col gap={24}>
              <Panel>
                <CopyButton variant="text" value={address} style={{ height: 'auto' }} showIcon>
                  {address}
                </CopyButton>
              </Panel>

              <Text size="text-xs" style={{ color: theme.colors.Error[400] }}>
                Send only {token} tokens under the {network.toUpperCase()} network to this address
              </Text>
            </Col>
          </Col>
        )}
      </Page>

      {/* Network Selection Modal */}
      <AppModal
        modalTitle="Network"
        visible={showSelection}
        handleClose={() => setShowSelection(false)}
      >
        <DataList
          hideHeader
          hideSearch
          data={data.networks}
          onSelect={(network) => {
            setShowSelection(false);
            setNetwork(network.name);
          }}
          renderItem={(network) => (
            <Col gap={6} style={{ marginTop: 8, marginBottom: 8 }}>
              <Text size="text-xs">{network.name.toUpperCase()}</Text>
            </Col>
          )}
        />
      </AppModal>
    </>
  );
});

DepositViaCryptoPage.displayName = 'DepositViaCryptoPage';

export default DepositViaCryptoPage;
