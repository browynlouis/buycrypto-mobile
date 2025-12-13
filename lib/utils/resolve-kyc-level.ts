export function resolveKycLevel(kycLevel: number) {
  switch (kycLevel) {
    case 0:
      return 'Not Verified';
    case 1:
      return 'Standard Verification';
    case 2:
      return 'Advanced Verification';
    default:
      return null;
  }
}
