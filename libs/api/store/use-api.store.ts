import { MiddlewareCallbackParams } from 'openapi-fetch';
import { create } from 'zustand';

interface ApiState {
  context: Partial<
    Omit<MiddlewareCallbackParams, 'schemaPath' | 'id' | 'options'> & { response?: Response }
  >;
  setContext: (context: ApiState['context']) => void;
}

const initialState = {
  context: {},
};

export const useApiStore = create<ApiState>()((set) => ({
  ...initialState,
  setContext(context) {
    return set((state) => ({
      ...state,
      context: {
        ...context,
      },
    }));
  },
}));
