import { useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';

import { $api } from '@/libs/api';
import { useApiStore } from '@/libs/api/store/use-api.store';
import { toast } from '@/libs/utils/toast';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { queryClient } from '@/shared/components/providers';
import { X_AUTH_ID_REQUEST_HEADER } from '@/shared/constants/common';

import { getAuthUser } from '../../api';
import { VerificationForm } from '../../components/verification-form';
import { useAuthStore } from '../../store';

export function EmailVerification({
  emailVerificationModal,
  setEmailVerificationModal,
}: {
  emailVerificationModal: boolean;
  setEmailVerificationModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const { context } = useApiStore();
  const { setTokens } = useAuthStore();

  /** Email verification request */
  const emailVerification = $api.useMutation('post', '/auth/email-verification/verify', {
    async onSuccess({ data }) {
      setEmailVerificationModal(false);
      setTokens(data.accessToken, data.refreshToken); // set auth tokens

      await queryClient.fetchQuery({
        queryKey: getAuthUser,
      });

      router.navigate('/(auth)'); // relaod the current route so the tokens are used to load the auth user
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  /** Email verification resend request */
  const emailVerificationResend = $api.useMutation('post', '/auth/email-verification/resend', {
    onSuccess() {
      toast().success('Email verification code resent');
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  return (
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
      <Loader isLoading={emailVerification.isPending || emailVerificationResend.isPending} />
    </AppModal>
  );
}
