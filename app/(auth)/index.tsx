import { useAuthStore } from '@/features/auth/store';
import { Page } from '@/shared/components/layouts/page';

export default function Auth() {
  const { clearTokens } = useAuthStore();

  return <Page></Page>;
}
