// ---------------------------
// COUNTRY FETCH + 1 MINUTE CACHE
import { $fetchClient } from '@/api/clients/fetch-client';

// ---------------------------
let cachedCountries: string[] | null = null;
let cacheTimestamp: number | null = null;

export async function countries(): Promise<string[]> {
  const now = Date.now();

  // Cache valid for 1 minute
  const cacheValid = cachedCountries && cacheTimestamp && now - cacheTimestamp < 60 * 1000;

  if (cacheValid) {
    return cachedCountries!;
  }

  const { data } = await $fetchClient.GET('/app/metadata/supported-countries');

  if (!data) throw new Error('An error occurred');

  cachedCountries = data.data.map((c) => c.code);
  cacheTimestamp = now;
  return cachedCountries;
}
