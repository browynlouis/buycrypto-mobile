import { PasswordScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Header } from '@/components/shared/ui/header';

export default function PasswordPage() {
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
