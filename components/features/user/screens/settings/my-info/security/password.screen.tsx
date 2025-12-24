import { usePasswordUpdate } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { ControlledInput } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';
import { useAuth } from '@/hooks';

const PasswordScreen = () => {
  const auth = useAuth();

  const { submit, isSubmitting, form } = usePasswordUpdate();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <>
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <Col gap={24}>
          <ControlledInput
            hiddenField
            name="password"
            control={control}
            startAdornment={<Icon name="Lock" />}
            placeholder="Please enter your password"
          />

          <ControlledInput
            hiddenField
            control={control}
            name="confirmPassword"
            startAdornment={<Icon name="Lock" />}
            placeholder="Please confirm your password"
          />
        </Col>

        <Button disabled={!isValid} onPress={handleSubmit((values) => submit(auth.twofaAuths))}>
          Update Password
        </Button>
      </Col>
    </>
  );
};

PasswordScreen.displayName = 'PasswordScreen';

export { PasswordScreen };
