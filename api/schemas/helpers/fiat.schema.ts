import z from 'zod';

import { $fetchClient } from '@/api/clients/fetch-client';

// ---------------------------
let cached: string[] | null = null;
let cacheTimestamp: number | null = null;

export const fiatSchema = z.string().refine(
  async (value) => {
    const isValid = (await fiats()).includes(value);

    return isValid;
  },
  {
    message: 'Invalid country',
  },
);

async function fiats(): Promise<string[]> {
  const now = Date.now();

  // Cache valid for 1 minute
  const cacheValid = cached && cacheTimestamp && now - cacheTimestamp < 60 * 5 * 1000;

  if (cacheValid) {
    return cached!;
  }

  const { data } = await $fetchClient.GET('/app/metadata/supported-fiats');

  if (!data) throw new Error('An error occurred');

  cached = data.data.map((fiat) => fiat);
  cacheTimestamp = now;

  return cached;
}
