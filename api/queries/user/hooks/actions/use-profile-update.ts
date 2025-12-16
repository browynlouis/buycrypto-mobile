import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { $queryClient } from '@/api/clients/query-client';
import { userProfileSchema } from '@/api/schemas/user.schema';
import { UpdateProfileDto } from '@/api/types';
import { useConfirmationContext } from '@/components/shared/providers/confirmation-provider/hooks';
import { queryClient } from '@/components/shared/providers/query-provider';
import { mapServerErrorsToClient, toast } from '@/lib/utils';

import { userKeys } from '../../keys';

export const useUpdateProfile = ({
  defaultValues,
}: {
  defaultValues: z.infer<typeof userProfileSchema>;
}) => {
  const router = useRouter();
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(userProfileSchema),
    defaultValues,
  });

  const { isConfirming, startConfirmation, endConfirmation } = useConfirmationContext();

  const updateProfileMutation = $queryClient.useMutation('post', '/users/me/profile', {
    async onSuccess(data) {
      const { data: profile } = data;

      form.reset({
        country: profile.country,
        dob: new Date(profile.dob),
        lastName: profile.lastName,
        firstName: profile.firstName,
        middleName: profile.middleName,
      });
      updateProfileMutation.reset();

      try {
        await queryClient.invalidateQueries({
          queryKey: userKeys.profile,
        });
      } catch (error: any) {
        toast().error('An error occurred! Please try again later');
      }

      router.push('/(protected)/(kyc)/confirmation');
    },
    onError(error) {
      toast().error(error.message);

      if (error.statusCode === 422) {
        mapServerErrorsToClient(form.setError, error.details.formErrors);
      }
    },
    onSettled() {
      endConfirmation();
    },
  });

  const submit = useCallback(
    (values: UpdateProfileDto) =>
      startConfirmation({
        title: 'Are you sure?',
        subText: 'The provided information would be use for your KYC verification!',
        onProceed() {
          updateProfileMutation.mutate({ body: values });
        },
      }),
    [],
  );

  return {
    form,
    submit,
    isSubmitting: updateProfileMutation.isPending || isConfirming,
  };
};
