import { z } from 'zod';

import { countries } from '@/lib/utils';

// ---------------------------
// DOB SCHEMA (>= 18 years old, not future)
// ---------------------------

export const dobSchema = z.date().refine(
  (date) => {
    const eighteenYearsAgo = new Date();

    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    // The DOB must be BEFORE or on the date 18 years ago
    return date <= eighteenYearsAgo;
  },
  {
    message: 'You must be at least 18 years old',
  },
);

// ---------------------------
// COUNTRY SCHEMA (async validation)
// ---------------------------
export const countrySchema = z.string().refine(
  async (value) => {
    const isValid = (await countries()).includes(value);

    return isValid;
  },
  {
    message: 'Invalid country',
  },
);
