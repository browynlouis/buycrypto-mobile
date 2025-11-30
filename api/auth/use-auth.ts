import { useAuthStore } from '@/libs/store';

/** Prefer to use over useAuthStore in authenticated context */
export function useAuth() {
  const { auth } = useAuthStore();

  return auth!;
}
