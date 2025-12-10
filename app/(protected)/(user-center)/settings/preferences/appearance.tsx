import { AppearanceScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function AppearancePage() {
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
