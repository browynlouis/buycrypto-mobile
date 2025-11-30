import { PasswordScreen } from '@/components/features/user/screens';
import { Header } from '@/components/shared/header';
import { Page } from '@/components/shared/layouts/page';

export default function Password() {
  return (
    <>
      {/* Page Header */}
      <Header title="Password" />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <PasswordScreen />
      </Page>
    </>
  );
}
