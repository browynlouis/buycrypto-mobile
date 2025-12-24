import { TokenCurrencyScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function TokenCurrencyPage() {
  return (
    <>
      {/* Header */}
      <Header title="Token Currency" />

      {/* Main Content */}
      <Page>
        <TokenCurrencyScreen />
      </Page>
    </>
  );
}
