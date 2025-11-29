import { AppearanceScreen } from '@/features/user/screens/user-center';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function Appearance() {
  return (
    <>
      {/* Page Header */}
      <Header title="Appearance" />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <AppearanceScreen />
      </Page>
    </>
  );
}
