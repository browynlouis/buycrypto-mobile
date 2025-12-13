import { $queryClient } from './clients/query-client';
import { components } from './generated/schema';

// Utils

export type QueryClientOptions = Omit<
  Parameters<typeof $queryClient.queryOptions>[3],
  'queryKey' | 'queryFn'
>;

// Auth Types

export type LoginDto = components['schemas']['LoginDto'];
export type ForgotPasswordDto = components['schemas']['ForgotPasswordDto'];
export type ForgotPasswordResetDto = components['schemas']['ForgotPasswordResetDto'];
export type TwoFactorAuthVerificationDto = components['schemas']['InputDto'][];

export type UpdateProfileDto = components['schemas']['UpdateProfileDto'];

export type FormError = components['schemas']['FormError'];
export type VerificationType = components['schemas']['VerificationType'];
export type VerificationPurpose = string;

export type AuthResource = components['schemas']['AuthResourceDto'];

// User Types
export type UserResource = components['schemas']['UserResourceDto'];
export type UserProfileResource = components['schemas']['UserProfileResourceDto'];
