import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { useVerificationAction } from '@/api/auth/actions';
import { resetPasswwordSchema as updatePasswordSchema } from '@/components/features/auth/schema';
import { $api } from '@/libs/api';
import { toast } from '@/libs/utils';

type FormValues = z.infer<typeof updatePasswordSchema>;

export const usePasswordUpdateAction = () => {
  const form = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const updatePasswordMutation = $api.useMutation('put', '/auth/password', {
    onSuccess() {
      form.reset();
      updatePasswordMutation.reset();

      toast().success('Password updated successfully!');
    },
  });

  const { verify } = useVerificationAction('PASSWORD_RESET', {
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
