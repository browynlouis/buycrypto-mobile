import { $queryClient } from '@/api/clients/query-client';
import { VerificationPurpose, VerificationType } from '@/api/types';
import { useVerificationContext } from '@/components/shared/providers/auth-provider/hooks';
import { VerificationCallbacks } from '@/components/shared/providers/auth-provider/types';
import { toast } from '@/libs/utils';

/**
 * useVerification
 * -------------------------
 * A hook that handles:
 * - Sending a verification request (email, SMS, or TOTP)
 * - Submitting verification codes
 * - Managing verification UI state through VerificationContext
 *
 * This hook:
 * - Ensures the user is authenticated before verification
 * - Coordinates request + verify steps
 * - Triggers callback hooks for success/error events
 *

 */
export function useVerification(
  purpose: VerificationPurpose,
  callbacks: VerificationCallbacks = {},
) {
  const { onRequestSuccess, onRequestError, onVerifySuccess, onVerifyError } = callbacks;

  const { startVerification, endVerification, setIsSubmitting } = useVerificationContext();

  /**
   * VERIFICATION SUBMISSION MUTATION
   * Handles verifying the code that the user inputs.
   */
  const verifyVerification = $queryClient.useMutation('post', '/auth/two-fa/verify', {
    onSuccess: () => {
      endVerification(); // Close modal/verification UI
      onVerifySuccess?.(); // Trigger success callback
      verifyVerification.reset(); // Reset mutation state
    },
    onError: (error) => {
      onVerifyError?.();
      toast().error(error.message ?? 'An error occurred! Please try again later');
    },
    onSettled: () => {
      setIsSubmitting(false); // Unlock UI loader
    },
  });

  /**
   * VERIFICATION REQUEST MUTATION
   * Sends verification (email, SMS, or TOTP request).
   */
  const requestVerification = $queryClient.useMutation('post', '/auth/two-fa/request', {
    onMutate: () => {
      setIsSubmitting(true); // Lock UI while sending request
    },
    onSuccess: () => {
      onRequestSuccess?.();
      requestVerification.reset(); // Reset mutation
      toast().success('Verification request sent successfully');
    },
    onError: (error) => {
      onRequestError?.();
      toast().error(error.message ?? 'Unable to send request! Please try again later');
    },
    onSettled: () => {
      setIsSubmitting(false); // Re-enable UI
    },
  });

  /**
   * verify()
   * -------------------------
   * Initiates the verification flow by:
   * - Showing verification UI
   * - Mapping `onSend` handlers dynamically based on user's allowed 2FA types
   * - Binding submit handlers for code verification
   */
  const verify = (types: VerificationType[]) => {
    startVerification({
      purpose,
      types, // Available verification methods

      /**
       * onSubmit
       * Triggered when the user enters a verification code.
       */
      async onSubmit(values) {
        verifyVerification.mutate({
          params: {
            query: { purpose },
          },
          body: { input: values },
        });
      },

      /**
       * onSend
       * A map of verification types -> function that triggers a request.
       * Example:
       *   { sms: () => send SMS request, email: () => send email request }
       */
      onSend: types.reduce(
        (acc, type) => {
          acc[type] = () => {
            requestVerification.mutate({
              params: {
                query: { type, purpose },
              },
            });
          };
          return acc;
        },
        {} as Record<Partial<VerificationType>, () => void>,
      ),
    });
  };

  return { verify };
}
