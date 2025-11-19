import { useAuthStore } from '@/features/auth/store';
import { Button } from '@/shared/components/ui/button';
import { Text } from '@/shared/components/ui/text';

export default function Index() {
  const { clearTokens } = useAuthStore();

  return (
    <Button onPress={() => clearTokens()}>
      <Text>Logout</Text>
    </Button>
  );
}
