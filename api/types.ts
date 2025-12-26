import { MaybeOptionalInit } from 'openapi-fetch';

import { $queryClient } from './clients/query-client';
import { components, paths } from './generated/schema';

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace';

/* ------------- Client ------------- */

export type QueryClientOptions<TMethod extends HttpMethod, TPath extends keyof paths> = {
  fetchOptions?: MaybeOptionalInit<paths[TPath], TMethod>;
  queryClientOptions?: Omit<
    Parameters<typeof $queryClient.queryOptions>[3],
    'queryKey' | 'queryFn'
  >;
};

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

export type TokenResource = components['schemas']['TokenResourceDto'];

/* ------------- Utils ------------- */

export type Fiat = components['schemas']['Fiat'];
export type Token = components['schemas']['Token'];
export type Network = components['schemas']['Network'];
export type FormError = components['schemas']['FormError'];
export type VerificationType = components['schemas']['VerificationType'];
export type VerificationPurpose = components['schemas']['VerificationPurpose'];
