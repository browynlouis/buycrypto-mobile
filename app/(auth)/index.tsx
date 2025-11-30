import { Page } from '@/components/shared/layouts/page';
import { useAuthStore } from '@/libs/store';

export default function Auth() {
  const { clearTokens } = useAuthStore();

  return <Page></Page>;
}
