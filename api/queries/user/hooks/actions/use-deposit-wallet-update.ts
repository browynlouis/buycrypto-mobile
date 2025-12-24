import { useCallback } from 'react';

import { $queryClient } from '@/api/clients/query-client';
import { UpdateDepositWalletSettingsDto } from '@/api/types';
import { queryClient } from '@/components/shared/providers/query-provider';
import { toast } from '@/lib/utils';

import { userKeys } from '../../keys';

export const useDepositWalletUpdate = () => {
  const updateDepositWalletMutation = $queryClient.useMutation(
    'post',
    '/users/me/settings/deposit-wallet',
    {
      async onSuccess(data, variables) {
        updateDepositWalletMutation.reset();

        try {
          await queryClient.invalidateQueries({
            queryKey: userKeys.me,
          });
        } catch (error: any) {
          toast().error('An error occurred! Please try again later');
        }
      },
      onError(error) {
        toast().error(error.message);
      },
    },
  );

  const submit = useCallback(
    (values: UpdateDepositWalletSettingsDto) =>
      updateDepositWalletMutation.mutate({ body: values }),
    [],
  );

  return {
    submit,
    isSubmitting: updateDepositWalletMutation.isPending,
  };
};
