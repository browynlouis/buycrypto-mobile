import { useCallback, useState } from 'react';

import { $queryClient } from '@/api/clients/query-client';
import { getAuthQueryOptions, useVerification } from '@/api/queries/auth';
import { VerificationType } from '@/api/types';
import { useVerificationContext } from '@/components/shared/providers/auth-provider/hooks';
import { queryClient } from '@/components/shared/providers/query-provider';
import { toast } from '@/libs/utils';

/**
 * useToggleAuthenticatorApp
 * ---------------------------------------------------------
 * Encapsulates all the logic for enabling/disabling TOTP.
 *
 * This hook manages:
 *  - Fetching auth data
 *  - Local switch state
 *  - Verification flow (2FA)
 *  - TOTP setup (secret, QR)
 *  - Final TOTP verification
 *
 * Exposes:
 *  - status           → current ON/OFF state
 *  - showSetup        → modal visibility
 *  - secretKey        → TOTP secret for QR
 *  - handleToggle     → handler for switch toggle
 *  - closeSetup       → close setup modal
 *  - proceedSetup     → triggers verification step inside modal
 */
export function useToggleAuthApp({
  isEnabled,
  twofaAuths,
}: {
  isEnabled: boolean;
  twofaAuths: VerificationType[];
}) {
  const [showSetup, setShowSetup] = useState(false);
  const [status, setStatus] = useState(() => isEnabled);

  const { startVerification, endVerification, setIsSubmitting } = useVerificationContext();

  /**
   * Start TOTP (enable/disable)
   * ---------------------------------------------------------
   * Backend returns:
   *   { status: true, secretKey: 'xxxx' } when enabling
   *   { status: false, secretKey: null } when disabling
   */
  const toggleAuthApp = $queryClient.useMutation('post', '/auth/configure-totp', {
    onSuccess: ({ data }) => {
      // Enabling -> show setup modal if enabled
      setShowSetup(data.status);

      // Disabling -> set toggle switch to false immediately
      if (!data.status) {
        setStatus(false);
        endVerification();
      }

      queryClient.invalidateQueries({
        queryKey: getAuthQueryOptions().queryKey,
      });
    },
    onError: (error) => toast().error(error.message),
  });

  /**
   * Final TOTP Verification (after scanning QR + entering code)
   */
  const verifyAuthApp = $queryClient.useMutation('post', '/auth/configure-totp/verify', {
    onSuccess: () => {
      setStatus(true); // Setup completed -> set toggle switch to true
      setShowSetup(false);

      endVerification();

      queryClient.invalidateQueries({
        queryKey: getAuthQueryOptions().queryKey,
      });
    },
    onError: (error) => toast().error(error.message),
    onSettled: () => setIsSubmitting(false),
  });

  /**
   * 2FA Verification Flow (Switch Protection)
   * ---------------------------------------------------------
   * Runs before enabling/disabling TOTP.
   */
  const { verify } = useVerification('TOTP_SETUP', {
    onVerifySuccess() {
      toggleAuthApp.mutate({});
    },
  });

  /**
   * handleToggle()
   * Called when user taps the Switch UI.
   * Triggers verification first.
   */
  const handleToggle = useCallback(() => verify(twofaAuths), [twofaAuths]);

  /**
   * proceedSetup()
   * Called when clicking "Continue" inside the TOTP setup modal.
   * Opens verification modal specifically for TOTP code.
   */
  const proceedSetup = () => {
    startVerification({
      types: ['TOTP'],
      purpose: 'TOTP_SETUP',
      onSubmit(values) {
        verifyAuthApp.mutate({
          body: { input: values },
        });
      },
    });
  };

  return {
    status,
    showSetup,
    secretKey: toggleAuthApp.data?.data.secretKey,

    proceedSetup,
    handleToggle,
    closeSetup: () => setShowSetup(false),
  };
}
