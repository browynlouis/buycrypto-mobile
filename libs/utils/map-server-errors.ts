import { FieldValues, UseFormSetError } from 'react-hook-form';

export type serverValidationError = { message: string; field: string };

/**
 * @function
 * Server to client validation map
 * This function is responsible for retrieving server side errors in the format above
 * It further then sends sets the error value for react-hook-form
 *
 * */
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
