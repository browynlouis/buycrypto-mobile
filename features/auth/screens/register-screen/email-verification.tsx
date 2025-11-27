import { Dispatch, SetStateAction } from 'react';

import { $api, useApiStore } from '@/libs/api';
import { toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { queryClient } from '@/shared/components/providers';
import { X_AUTH_ID_REQUEST_HEADER } from '@/shared/constants/common';

import { getAuth, resendEmailVerification, verifyEmailVerification } from '../../api';
import { VerificationForm } from '../../components';
import { useAuthStore } from '../../store';
import { AuthResource } from '../../types';

export function EmailVerification({
  emailVerificationModal,
  setEmailVerificationModal,
}: {
  emailVerificationModal: boolean;
  setEmailVerificationModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { context } = useApiStore();
  const { setTokens, setAuth } = useAuthStore();

  /** Email verification request */
  const emailVerification = $api.useMutation(...verifyEmailVerification, {
    async onSuccess({ data }) {
      emailVerification.reset();

      setEmailVerificationModal(false);
      setTokens(data.accessToken, data.refreshToken); // set auth tokens

      // Fetch auth user before navigating to ensure state is set
      const auth = await queryClient.fetchQuery<AuthResource>({
        queryKey: getAuth,
      });

      // Set Auth
      setAuth(auth);
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  /** Email verification resend request */
  const emailVerificationResend = $api.useMutation(...resendEmailVerification, {
    onSuccess() {
      toast().success('Email verification code resent');
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  return (
    <>
      <Loader isLoading={emailVerification.isPending || emailVerificationResend.isPending} />

      <AppModal
        modalTitle="Verify Your Email"
        visible={emailVerificationModal}
        handleClose={() => setEmailVerificationModal(false)}
      >
        <VerificationForm
          types={['EMAIL']} // Verification type email
          resendRequest={(type) => {
            const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);

            /** Calls the request to resend request for email verification */
            emailVerificationResend.mutate({
              headers: {
                [X_AUTH_ID_REQUEST_HEADER]: authId,
              },
            });
          }}
          onSubmit={(values) => {
            const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);

            /** Calls the request to validate the email address with input values from the verification form */
            emailVerification.mutate({
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
