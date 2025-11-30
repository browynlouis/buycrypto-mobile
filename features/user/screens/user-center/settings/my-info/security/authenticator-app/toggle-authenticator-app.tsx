import { Suspense } from '@suspensive/react';
import { useState } from 'react';

import { getAuth } from '@/api/auth';
import { $api } from '@/libs/api';
import { toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import {
  useVerificationContext,
  useVerificationRequest,
} from '@/shared/components/providers/auth-provider/hooks';
import { Switch } from '@/shared/components/ui/switch';

import { SetupModal } from './_partials/setup-modal';

/**
 * ToggleAuthenticatorApp
 *
 * Handles enabling and disabling TOTP-based authentication.
 * Includes verification flow, secret key display, QR code setup,
 * and mutation handling with clear UX feedback.
 */
const ToggleAuthenticatorApp = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  // Fetch authenticated user
  const {
    data: { data: auth },
  } = $api.useSuspenseQuery(...getAuth);

  // Local state
  const [showSetup, setShowSetup] = useState(false); // Handles showing the QrCode modal
  const [status, setStatus] = useState(() => auth.twofaAuths.includes('TOTP')); // Handles the state of the switch button

  // Mutation: Initiate TOTP Setup (Enable) / Disable
  const toggleAuthApp = $api.useMutation('post', '/auth/configure-totp', {
    onSuccess: ({ data }) => {
      setShowSetup(data.status);

      if (!data.status) setStatus(false);
    },
    onError: (error) => toast().error(error.message),
  });

  // Mutation: Verify setup with TOTP code
  const verifyAuthApp = $api.useMutation('post', '/auth/configure-totp/verify', {
    onSuccess: () => {
      setStatus(true);
      endVerification();
    },
    onError: (error) => toast().error(error.message),
  });

  // Verification helpers
  const { startVerification, endVerification, setIsSubmitting } = useVerificationContext();
  const { handleSend, handleVerification } = useVerificationRequest('TWO_FA_AUTH_CHANGE', {
    onVerifySuccess() {
      endVerification();
      toggleAuthApp.mutate({});
    },
    onVerifyError() {
      setIsSubmitting(false);
    },
  });

  return (
    <>
      {/* Global Loader for mutations */}
      <Loader isLoading={toggleAuthApp.isPending} />

      {/* Main TOTP toggle switch */}
      <Switch
        value={status}
        onValueChange={() => {
          startVerification({
            types: auth.twofaAuths,
            purpose: 'TWO_FA_AUTH_CHANGE',
            onSubmit: handleVerification,
            onSend: { EMAIL: () => handleSend('EMAIL') },
          });
        }}
      />

      {/* TOTP Setup Modal */}
      <SetupModal
        visible={showSetup}
        handleClose={() => setShowSetup(false)}
        secretKey={toggleAuthApp.data?.data.secretKey}
        onProceed={() => {
          startVerification({
            types: ['TOTP'],
            purpose: 'TWO_FA_AUTH_CHANGE',
            async onSubmit(values) {
              try {
                await verifyAuthApp.mutateAsync({ body: { input: values } });
              } finally {
                setIsSubmitting(false);
              }
            },
          });
        }}
      />
    </>
  );
});

ToggleAuthenticatorApp.displayName = 'ToggleAuthenticatorApp';

export { ToggleAuthenticatorApp };
