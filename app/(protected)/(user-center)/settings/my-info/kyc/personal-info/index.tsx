import { KycPersonalInfoScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function KycPersonalInfoPage() {
  return (
    <>
      {/* Page Header */}
      <Header title="Personal Info" />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <KycPersonalInfoScreen />
      </Page>
    </>
  );
}
