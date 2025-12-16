import { KycConfirmationScreen } from '@/components/features/kyc/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function KycConfimationPage() {
  return (
    <>
      {/* Page Header */}
      <Header title="KYC Verification" />

      {/* Page Body */}
      <Page>
        <KycConfirmationScreen />
      </Page>
    </>
  );
}
