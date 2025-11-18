import { FieldValues, UseFormSetError } from 'react-hook-form';

export type serverValidationError = { message: string; field: string };

export function mapServerErrorsToClient<T extends FieldValues>(
  setError: UseFormSetError<T>,
  serverErrors?: serverValidationError[],
) {
  if (serverErrors) {
    serverErrors.forEach((serverError) => {
      setError(serverError.field as any, {
        message: serverError.message.toUpperCase().concat(serverError.message.slice(1)),
      });
    });
  }
}
