import { SecurityScreen } from '@/features/user/screens/user-center/settings/my-info/security';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function Security() {
  return (
    <>
      <Header title="Security" />

      <Page>
        <SecurityScreen />
      </Page>
    </>
  );
}
