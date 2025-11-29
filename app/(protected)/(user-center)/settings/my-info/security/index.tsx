import { SecurityScreen } from '@/features/user/screens/user-center';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function Security() {
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
