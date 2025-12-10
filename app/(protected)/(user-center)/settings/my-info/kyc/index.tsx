import { KycScreen } from '@/components/features/user/screens';
import { Page } from '@/components/shared/layouts/page';
import { Button } from '@/components/shared/ui/button';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';

export default function KycPage() {
  return (
    <>
      {/* Page Header */}
      <Header title="KYC Verification" />

      {/* Page Body */}
      <Page>
        {/* Main Content */}
        <KycScreen />

        {/*  */}
        <Button variant="plain" style={{ marginTop: 'auto' }} endAdornment={<Icon name="Shield" />}>
          Start Verification
        </Button>
      </Page>
    </>
  );
}
