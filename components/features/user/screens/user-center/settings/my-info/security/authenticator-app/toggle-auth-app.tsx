import { useAuth } from '@/api/auth/use-auth';
import { useToggleAuthAppAction } from '@/api/user/actions';
import { Switch } from '@/components/shared/ui/switch';

import { SetupModal } from './_partials/setup-modal';

/**
 * ToggleAuthenticatorApp
 * ---------------------------------------------------------
 * Manages enabling/disabling TOTP authentication.
 *
 * Workflow:
 *   - User taps switch → triggers verification (2FA)
 *   - On verification success → start or stop TOTP configuration
 *   - If enabling → show setup modal with secret + QR
 *   - User enters TOTP code → verify → finish setup
 *
 * This component centralizes:
 *   • State management
 *   • Request flow
 *   • Verification flow
 *   • TOTP setup modal control
 */
const ToggleAuthenticatorApp = () => {
  const auth = useAuth();

  const {
    status,
    showSetup,
    secretKey,

    closeSetup,
    proceedSetup,
    handleToggle,
  } = useToggleAuthAppAction({
    twofaAuths: auth.twofaAuths,
    isEnabled: auth.twofaAuths.includes('TOTP'),
  });

  return (
    <>
      {/* Main Toggle Switch */}
      <Switch value={status} onValueChange={handleToggle} />

      {/* TOTP Setup Modal */}
      <SetupModal
        visible={showSetup}
        handleClose={() => closeSetup()}
        secretKey={secretKey}
        // Show verification modal only for TOTP codes
        onProceed={proceedSetup}
      />
    </>
  );
};

ToggleAuthenticatorApp.displayName = 'ToggleAuthenticatorApp';

export { ToggleAuthenticatorApp };
