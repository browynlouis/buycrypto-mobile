import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { $queryClient } from '@/api/clients/query-client';
import { usernameSchema } from '@/api/schemas/user.schema';
import { queryClient } from '@/components/shared/providers/query-provider';
import { mapServerErrorsToClient, toast } from '@/lib/utils';

import { userKeys } from '../../keys';

export function useUpdateUsername({ username }: { username: string | null }) {
  // Setup form with default values and validation
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: username ?? '',
    },
  });

  useEffect(() => {
    username && form.reset({ username: username });
  }, [username]);

  // Mutation to update username
  const { mutate, isPending, reset } = $queryClient.useMutation('post', '/users/me/username', {
    async onSuccess(data, variables) {
      // Reset mutation state and form values
      reset();
      form.reset(variables.body);

      try {
        // Set username of the user query
        await queryClient.invalidateQueries({
          queryKey: userKeys.me,
          refetchType: 'all',
        });
      } catch (error: any) {
        toast().error('An error occurred! Please try again later');
      }
    },
    onError(error) {
      toast().error(error.message);

      // Map server-side validation errors to form fields
      if (error.details?.formErrors) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors);
      }
    },
  });

  const submit = useCallback(
    (values: { username: string }) => mutate({ body: values }),
    [username],
  );

  return {
    form,
    submit,
    isSubmitting: isPending,
  };
}
