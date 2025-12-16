import { useKycRequest } from '@/api/queries/kyc';
import { BottomScreenWrapper } from '@/components/shared/ui/bottom-screen-wrapper';
import { Button } from '@/components/shared/ui/button';
import { Icon } from '@/components/shared/ui/icon';
import { Loader } from '@/components/shared/ui/loader';

export function KycConfirmationScreen() {
  const { submit, isSubmitting } = useKycRequest();

  return (
    <>
      <Loader isLoading={isSubmitting} />

      <BottomScreenWrapper>
        <Button size="md" endAdornment={<Icon name="Shield" />} onPress={() => submit()}>
          Proceed With Verification
        </Button>
      </BottomScreenWrapper>
    </>
  );
}
