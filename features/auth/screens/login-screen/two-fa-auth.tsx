import { Dispatch, SetStateAction } from 'react';

import { $api, useApiStore } from '@/libs/api';
import { toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { AppModal } from '@/shared/components/modal';
import { queryClient } from '@/shared/components/providers';
import { X_AUTH_ID_REQUEST_HEADER } from '@/shared/constants/common';

import { getAuth, verifyLogin } from '../../api';
import { VerificationForm } from '../../components';
import { useAuthStore } from '../../store';
import { AuthResource, VerificationType } from '../../types';

export function TwoFactorAuthentication({
  types,
  twoFaAuthModal,
  setTwoFaAuthModal,
}: {
  types: VerificationType[];
  twoFaAuthModal: boolean;
  setTwoFaAuthModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { context } = useApiStore();
  const { setTokens, setAuth } = useAuthStore();

  const { mutate, isPending, reset } = $api.useMutation(...verifyLogin, {
    async onSuccess({ data }) {
      reset();

      setTwoFaAuthModal(false);
      setTokens(data.accessToken, data.refreshToken); // set auth tokens

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
