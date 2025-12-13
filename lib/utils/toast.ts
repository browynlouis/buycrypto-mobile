import Toast from 'react-native-toast-message';

/**

 * Utility wrapper for `react-native-toast-message` to display
 * success or error messages in a consistent way.
 *
 * Usage:
 * ```ts
 * toast().success("Operation successful");
 * toast().error("Something went wrong");
 * ```
 *
 */
export function toast() {
  return {
    error(message?: string | null) {
      return message ? Toast.show({ type: 'error', text1: message }) : null;
    },
    success(message?: string | null) {
      return message ? Toast.show({ type: 'success', text1: message }) : null;
    },
  };
}
