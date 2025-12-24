import { useCallback } from 'react';

import { $queryClient } from '@/api/clients/query-client';
import { UpdateFiatCurrencySettingsDto } from '@/api/types';
import { queryClient } from '@/components/shared/providers/query-provider';
import { toast } from '@/lib/utils';

import { userKeys } from '../../keys';

export const useFiatUpdate = () => {
  const updateFiatMutation = $queryClient.useMutation('post', '/users/me/settings/fiat-currency', {
    async onSuccess(data, variables) {
      updateFiatMutation.reset();

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
  });

  const submit = useCallback(
    (values: UpdateFiatCurrencySettingsDto) => updateFiatMutation.mutate({ body: values }),
    [],
  );

  return {
    submit,
    isSubmitting: updateFiatMutation.isPending,
  };
};
