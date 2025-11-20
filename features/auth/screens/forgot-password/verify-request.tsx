import { useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';

import { $api, useApiStore } from '@/libs/api';
import { toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { X_AUTH_ID_REQUEST_HEADER } from '@/shared/constants/common';

import { forgotPasswordVerify } from '../../api';
import { VerificationForm } from '../../components/';

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
  const { mutate, isPending, reset } = $api.useMutation(...forgotPasswordVerify, {
    onSuccess() {
      reset();
      // Set the modal value to 'reset' to trigger the reset screen
      setVerificationModal(false);
      router.push('/(auth)/password/reset');
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
