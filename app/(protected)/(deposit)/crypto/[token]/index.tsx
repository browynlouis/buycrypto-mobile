import { Suspense } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

import { getTokenDataQueryOptions } from '@/api/queries/blockchain';
import { getUserWalleAddresQueryOptions } from '@/api/queries/user';
import { Network, Token, TokenResource } from '@/api/types';
import { Page } from '@/components/shared/layouts/page';
import { Avatar } from '@/components/shared/ui/avatar';
import { BottomScreenWrapper } from '@/components/shared/ui/bottom-screen-wrapper';
import { Button } from '@/components/shared/ui/button';
import { CopyButton } from '@/components/shared/ui/copy-button';
import { Col } from '@/components/shared/ui/flex';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';
import { DataList } from '@/components/shared/ui/list/data-list';
import { Loader } from '@/components/shared/ui/loader';
import { AppModal } from '@/components/shared/ui/modal';
import { QrCodeDisplay } from '@/components/shared/ui/qr-code';
import { Text } from '@/components/shared/ui/text';
import { toast } from '@/lib/utils';

const DepositViaCryptoPage = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token: Token }>();

  if (!token) {
    toast().error('Token not provided');

    router.back();

    return;
  }

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

  const [network, setNetwork] = useState<Network | null>(null);
  const [showSelection, setShowSelection] = useState<boolean>(true);

  return (
    <>
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

        {network && <AddressDisplay network={network} token={data} />}
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

function AddressDisplay({ network, token }: { network: Network; token: TokenResource }) {
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

  const address = walletAddress?.data.address;

  return (
    <>
      {address && (
        <>
          <Loader isLoading={isFetching} />

          <Col gap={32}>
            <QrCodeDisplay
              logoSize={24}
              value={address}
              logo={{ uri: token.metadata.icon ?? undefined }}
            />

            <Col gap={24}>
              <Col gap={6} align="flex-start" justify="flex-start">
                <Text size="text-md" faded>
                  Wallet Address
                </Text>
                <CopyButton
                  size="md"
                  variant="text"
                  value={address}
                  style={{ height: 'auto', paddingLeft: 6, paddingRight: 6 }}
                >
                  {address}
                </CopyButton>
              </Col>
            </Col>
          </Col>

          <BottomScreenWrapper>
            <CopyButton
              size="md"
              value={address}
              variant="plain"
              style={{ width: '100%' }}
              showIcon
            >
              Copy Address
            </CopyButton>
          </BottomScreenWrapper>
        </>
      )}
    </>
  );
}

DepositViaCryptoPage.displayName = 'DepositViaCryptoPage';

export default DepositViaCryptoPage;
