export const login = ['post', '/auth/login'] as const;
export const verifyLogin = ['post', '/auth/login/verify'] as const;

export const register = ['post', '/auth/register'] as const;
export const verifyEmailVerification = ['post', '/auth/email-verification/verify'] as const;
export const resendEmailVerification = ['post', '/auth/email-verification/resend'] as const;

export const forgotPassword = ['post', '/auth/forgot-password'] as const;
export const forgotPasswordVerify = ['post', '/auth/forgot-password/verify'] as const;

export const resetPassword = ['post', '/auth/forgot-password/reset'] as const;
