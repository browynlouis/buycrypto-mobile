import { useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';

import { $api } from '@/libs/api';
import { useApiStore } from '@/libs/api/store/use-api.store';
import { toast } from '@/libs/utils/toast';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { X_AUTH_ID_REQUEST_HEADER } from '@/shared/constants/common';

import { VerificationForm } from '../../components/verification-form';

export function VerifyRequest({
  setVerificationModal,
  verificationModal,
}: {
  verificationModal: boolean;
  setVerificationModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const { context } = useApiStore();

  /** Verification request */
  const { mutate, isPending, reset } = $api.useMutation('post', '/auth/forgot-password/verify', {
    onSuccess() {
      reset();
      // Set the modal value to 'reset' to trigger the reset screen
      setVerificationModal(false);
      router.push('/(auth)/forgot-password/reset-password');
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

      <AppModal
        visible={verificationModal}
        modalTitle="Verify your request"
        handleClose={() => setVerificationModal(false)}
      >
        <VerificationForm
          types={['EMAIL']}
          onSubmit={(values) => {
            const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);

            /** Submits the verification request */
            mutate({
              headers: {
                [X_AUTH_ID_REQUEST_HEADER]: authId,
              },
              body: {
                token: values['EMAIL']!,
              },
            });
          }}
        />
      </AppModal>
    </>
  );
}
