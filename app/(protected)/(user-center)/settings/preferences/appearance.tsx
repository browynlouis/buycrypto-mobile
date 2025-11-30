import { AppearanceScreen } from '@/components/features/user/screens';
import { Header } from '@/components/shared/header';
import { Page } from '@/components/shared/layouts/page';

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
