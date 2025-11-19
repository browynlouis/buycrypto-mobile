import { ResetPassword } from '@/features/auth/screens/reset-password';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';

export default function ResetPasswordPage() {
  return (
    <>
      <Header showBackButton />
      <Page>
        <ResetPassword />
      </Page>
    </>
  );
}
