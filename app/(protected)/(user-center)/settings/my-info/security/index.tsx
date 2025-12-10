import { SecurityScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function SecurityPage() {
  return (
    <>
      {/* Page Header */}
      <Header title="Security" />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <SecurityScreen />
      </Page>
    </>
  );
}
