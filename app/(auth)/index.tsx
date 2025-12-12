import { Page } from '@/components/shared/layouts/page';
import { useAuthStore } from '@/store';

export default function Auth() {
  const { clear } = useAuthStore();

  return <Page></Page>;
}
