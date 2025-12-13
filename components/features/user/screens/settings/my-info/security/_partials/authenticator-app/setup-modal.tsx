import { Button } from '@/components/shared/ui/button';
import { CopyButton } from '@/components/shared/ui/copy-button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { InputHelperText } from '@/components/shared/ui/input';
import { AppModal, AppModalProps } from '@/components/shared/ui/modal';
import { QrCodeDisplay } from '@/components/shared/ui/qr-code';
import { Text } from '@/components/shared/ui/text';
import { toast } from '@/lib/utils';

export function SetupModal({
  visible,
  handleClose,
  onProceed,
  secretKey,
}: {
  onProceed: () => void;
  visible: boolean;
  secretKey?: string | null;
  handleClose: AppModalProps['handleClose'];
}) {
  if (visible && !secretKey) {
    toast().error('Unable to fetch secret key');

    return;
  }

  return (
    <AppModal
      visible={visible}
      handleClose={handleClose}
      modalTitle="Set up your authenticator app"
    >
      <Col gap={24}>
        <Text>
          Scan the QR code using your authenticator app or copy the secret key manually, then click
          "Proceed" to continue.
        </Text>

        <QrCodeDisplay value={secretKey!} />

        <Col gap={12}>
          <CopyButton variant="plain" endAdornment={<Icon name="Copy" />} value={secretKey!}>
            Copy Secret Key
          </CopyButton>

          <Button onPress={onProceed}>Proceed</Button>

          <InputHelperText variant="error">
            * This is a sensitive key. Do not share this with anyone.
          </InputHelperText>
        </Col>
      </Col>
    </AppModal>
  );
}
