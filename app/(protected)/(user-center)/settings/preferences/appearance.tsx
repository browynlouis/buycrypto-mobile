import { AppearanceScreen } from '@/features/user/screens/user-center/settings/preferences/appearance';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function Appearance() {
  return (
    <>
      <Header title="Appearance" />

      <Page>
        <AppearanceScreen />
      </Page>
    </>
  );
}
