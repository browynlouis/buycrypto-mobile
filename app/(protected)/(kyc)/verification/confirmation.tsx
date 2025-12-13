import { Page } from '@/components/shared/layouts/page';
import { Button } from '@/components/shared/ui/button';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';

export default function KycConfimationPage() {
  return (
    <>
      {/* Page Header */}
      <Header title="KYC Verification" />

      {/* Page Body */}
      <Page>
        <Button size="md" endAdornment={<Icon name="Shield" />}>
          Proceed With Verification
        </Button>
      </Page>
    </>
  );
}
