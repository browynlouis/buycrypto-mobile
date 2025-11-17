import { useAuthStore } from '../store';

/** Will either return auth with a value or redirect to login
 * Use when you are sure that auth is not null i.e when the user is logged in
 * @returns {Auth}
 */

export function useSafeAuth() {
  const auth = useAuthStore((s) => s.auth);

  return auth!;
}
