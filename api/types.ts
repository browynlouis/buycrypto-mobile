import { $queryClient } from './clients/query-client';
import { components } from './generated/schema';

/* ------------- Client ------------- */

export type QueryClientOptions = Omit<
  Parameters<typeof $queryClient.queryOptions>[3],
  'queryKey' | 'queryFn'
>;

/* ------------- Schemas / DTOs ------------- */

export type LoginDto = components['schemas']['LoginDto'];
export type ForgotPasswordDto = components['schemas']['ForgotPasswordDto'];
export type TwoFactorAuthVerificationDto = components['schemas']['InputDto'][];
export type ForgotPasswordResetDto = components['schemas']['ForgotPasswordResetDto'];

export type UpdateProfileDto = components['schemas']['UpdateProfileDto'];
export type UpdateFiatCurrencySettingsDto = components['schemas']['UpdateFiatCurrencySettingsDto'];
export type UpdateTokenCurrencySettingsDto =
  components['schemas']['UpdateTokenCurrencySettingsDto'];
export type UpdateDepositWalletSettingsDto =
  components['schemas']['UpdateDepositWalletSettingsDto'];

/* ------------- Resources ------------- */

export type AuthResource = components['schemas']['AuthResourceDto'];

export type UserResource = components['schemas']['UserResourceDto'];
export type UserProfileResource = components['schemas']['UserProfileResourceDto'];

/* ------------- Utils ------------- */

export type Fiat = components['schemas']['Fiat'];
export type Token = components['schemas']['Token'];
export type FormError = components['schemas']['FormError'];
export type VerificationType = components['schemas']['VerificationType'];
export type VerificationPurpose = components['schemas']['VerificationPurpose'];
