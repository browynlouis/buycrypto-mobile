import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { $queryClient } from '@/api/clients/query-client';
import { useVerification } from '@/api/queries/auth';
import { resetPasswwordSchema as updatePasswordSchema } from '@/api/schemas/auth.schema';
import { toast } from '@/lib/utils';

export const usePasswordUpdate = () => {
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const updatePasswordMutation = $queryClient.useMutation('put', '/auth/password', {
    onSuccess() {
      form.reset();
      updatePasswordMutation.reset();

      toast().success('Password updated successfully!');
    },
  });

  const { verify } = useVerification('PASSWORD_UPDATE', {
    onVerifySuccess() {
      updatePasswordMutation.mutate({
        body: form.getValues(),
      });
    },
  });

  return {
    form,
    /** Verifies the user and if successful, the update password mutation is called */
    submit: verify,
    isSubmitting: updatePasswordMutation.isPending,
  };
};
