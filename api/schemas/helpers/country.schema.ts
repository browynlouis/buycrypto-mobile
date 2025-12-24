import z from 'zod';

import { $fetchClient } from '@/api/clients/fetch-client';

// ---------------------------
let cached: string[] | null = null;
let cacheTimestamp: number | null = null;

export const countrySchema = z.string().refine(
  async (value) => {
    const isValid = (await countries()).includes(value);

    return isValid;
  },
  {
    message: 'Invalid country',
  },
);

async function countries(): Promise<string[]> {
  const now = Date.now();

  // Cache valid for 1 minute
  const cacheValid = cached && cacheTimestamp && now - cacheTimestamp < 60 * 5 * 1000;

  if (cacheValid) {
    return cached!;
  }

  const { data } = await $fetchClient.GET('/app/metadata/supported-countries');

  if (!data) throw new Error('An error occurred');

  cached = data.data.map((c) => c.code);
  cacheTimestamp = now;
  return cached;
}
