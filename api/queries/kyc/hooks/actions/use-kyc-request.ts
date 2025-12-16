import * as Linking from 'expo-linking';
import { useCallback } from 'react';

import { $queryClient } from '@/api/clients/query-client';
import { useConfirmationContext } from '@/components/shared/providers/confirmation-provider/hooks';
import { toast } from '@/lib/utils';

export function useKycRequest() {
  const { startConfirmation, endConfirmation, isConfirming } = useConfirmationContext();
  /** -------------------------------
   *  KYC Request MUTATION
   * ------------------------------- */
  const requestKycMutation = $queryClient.useMutation('post', '/kyc/request', {
    onSuccess: async ({ data }) => {
      requestKycMutation.reset();
      try {
        const canOpen = await Linking.canOpenURL(data.url);

        if (!canOpen) {
          throw new Error(`Cannot open url: ${data.url}`);
        }

        await Linking.openURL(data.url);
      } catch (error) {
        console.log(error);
        toast().error("An error occurred! Unable to open app's browser");
      }
    },
    onError: (error) => {
      toast().error(error.message);
    },
    onSettled() {
      endConfirmation();
    },
  });

  /** -------------------------------
   *  Submit Handler
   * ------------------------------- */
  const submit = useCallback(() => {
    startConfirmation({
      title: 'Proceed with KYC?',
      subText: 'You will be redirected to a third party provider to complete your verification',
      onProceed() {
        requestKycMutation.mutate({});
      },
    });
  }, [requestKycMutation]);

  return {
    submit: submit,
    isSubmitting: requestKycMutation.isPending || isConfirming,
  };
}
