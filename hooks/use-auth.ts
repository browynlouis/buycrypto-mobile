import { useAuthStore } from '@/store';

export function useAuth() {
  const { auth } = useAuthStore();

  return auth!;
}
