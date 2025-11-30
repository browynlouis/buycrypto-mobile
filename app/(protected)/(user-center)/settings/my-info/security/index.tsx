import { SecurityScreen } from '@/components/features/user/screens';
import { Header } from '@/components/shared/header';
import { Page } from '@/components/shared/layouts/page';

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
