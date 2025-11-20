import { useRouter } from 'expo-router';
import { Dispatch, SetStateAction } from 'react';

import { $api } from '@/libs/api';
import { useApiStore } from '@/libs/api/store/use-api.store';
import { toast } from '@/libs/utils/toast';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { queryClient } from '@/shared/components/providers';
import { X_AUTH_ID_REQUEST_HEADER } from '@/shared/constants/common';

import { getAuth, verifyLogin } from '../../api';
import { VerificationForm } from '../../components/verification-form';
import { useAuthStore } from '../../store';
import { VerificationType } from '../../types';

export function TwoFactorAuthentication({
  types,
  twoFaAuthModal,
  setTwoFaAuthModal,
}: {
  types: VerificationType[];
  twoFaAuthModal: boolean;
  setTwoFaAuthModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const { context } = useApiStore();
  const { setTokens } = useAuthStore();

  const { mutate, isPending, reset } = $api.useMutation(...verifyLogin, {
    async onSuccess({ data }) {
      reset();

      setTwoFaAuthModal(false);
      setTokens(data.accessToken, data.refreshToken); // set auth tokens

      await queryClient.fetchQuery({
        queryKey: getAuth,
      });

      router.replace('/(auth)'); // relaod the current route so the tokens are used to load the auth user
    },
    onError(error) {
      toast().error(error.message);
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

      <AppModal
        visible={twoFaAuthModal}
        modalTitle="Verify Your Email"
        handleClose={() => setTwoFaAuthModal(false)}
      >
        <VerificationForm
          types={types} // Verification type email
          resendRequest={(type) => {}}
          onSubmit={(values) => {
            const authId = context.response?.headers.get(X_AUTH_ID_REQUEST_HEADER);

            mutate({
              headers: {
                [X_AUTH_ID_REQUEST_HEADER]: authId,
              },
              body: {
                input: Object.entries(values).map(([key, value]) => ({
                  value,
                  key: key as VerificationType,
                })),
              },
            });
          }}
        />
      </AppModal>
    </>
  );
}
