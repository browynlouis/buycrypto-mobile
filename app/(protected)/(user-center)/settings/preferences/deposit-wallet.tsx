import { DepositWalletScreen } from '@/components/features/user/screens/settings/preferences/deposit-wallet.screen';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function DepositWalletPage() {
  return (
    <>
      {/* Header */}
      <Header title="Deposit Wallet" />

      {/* Main Content */}
      <Page>
        <DepositWalletScreen />
      </Page>
    </>
  );
}
