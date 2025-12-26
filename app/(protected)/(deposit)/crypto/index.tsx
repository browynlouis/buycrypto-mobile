import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

import { getTokensDataQueryOptions } from '@/api/queries/blockchain';
import { Page } from '@/components/shared/layouts/page';
import { Avatar } from '@/components/shared/ui/avatar';
import { Row } from '@/components/shared/ui/flex';
import { Header } from '@/components/shared/ui/header';
import { DataList } from '@/components/shared/ui/list/data-list';
import { Loader } from '@/components/shared/ui/loader';
import { Text } from '@/components/shared/ui/text';

const DepositViaCryptoListPage = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();

  const {
    data: { data },
  } = useSuspenseQuery(getTokensDataQueryOptions());

  return (
    <>
      {/* Header */}
      <Header showBackButton title="Deposit Crypto" />

      {/* Main Content */}
      <Page noScrollView>
        <DataList
          hideHeader
          data={data}
          filterFn={(value, data) =>
            data.filter((item) => {
              const normalizedValue = value.trim().toLowerCase();

              return (
                item.name.toLowerCase().includes(normalizedValue) ||
                item.name.toLowerCase().startsWith(normalizedValue) ||
                item.symbol.toString().toLowerCase().includes(normalizedValue) ||
                item.symbol.toString().toLowerCase().startsWith(normalizedValue)
              );
            })
          }
          onSelect={(item) => router.push(`/(protected)/(deposit)/crypto/${item.symbol}`)}
          renderItem={(token) => (
            <Row gap={12} style={{ paddingTop: 12, paddingBottom: 12 }}>
              <Avatar size={24} imageSource={{ uri: token.metadata.icon ?? undefined }} />
              <Row gap={12}>
                <Text size="text-md" weight={600}>
                  {token.symbol}
                </Text>
                <Text faded size="text-xs">
                  {token.name}
                </Text>
              </Row>
            </Row>
          )}
        />
      </Page>
    </>
  );
});

DepositViaCryptoListPage.displayName = 'DepositViaCryptoListPage';

export default DepositViaCryptoListPage;
