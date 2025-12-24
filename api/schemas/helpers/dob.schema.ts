import z from 'zod';

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
