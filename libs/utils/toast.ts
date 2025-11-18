import Toast from 'react-native-toast-message';

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
