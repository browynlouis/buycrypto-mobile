import { toast } from '@/libs/utils';
import { CopyButton } from '@/shared/components/copy-buton';
import { AppModal, AppModalProps } from '@/shared/components/modal';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { InputHelperText } from '@/shared/components/ui/input';
import { QrCodeDisplay } from '@/shared/components/ui/qr-code';
import { Text } from '@/shared/components/ui/text';

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
