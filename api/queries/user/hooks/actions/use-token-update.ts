import { useCallback } from 'react';

import { $queryClient } from '@/api/clients/query-client';
import { UpdateTokenCurrencySettingsDto } from '@/api/types';
import { queryClient } from '@/components/shared/providers/query-provider';
import { toast } from '@/lib/utils';

import { userKeys } from '../../keys';

export const useTokenUpdate = () => {
  const updateTokenMutation = $queryClient.useMutation(
    'post',
    '/users/me/settings/token-currency',
    {
      async onSuccess(data, variables) {
        updateTokenMutation.reset();

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
    (values: UpdateTokenCurrencySettingsDto) => updateTokenMutation.mutate({ body: values }),
    [],
  );

  return {
    submit,
    isSubmitting: updateTokenMutation.isPending,
  };
};
