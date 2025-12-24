import { FiatCurrencyScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function FiatCurrencyPage() {
  return (
    <>
      {/* Header */}
      <Header title="Fiat Currency" />

      {/* Main Content */}
      <Page>
        <FiatCurrencyScreen />
      </Page>
    </>
  );
}
