import 'styled-components/native';

import { AppTheme } from '@/styles';

declare global {
  interface Request {
    /** Custom properties used to track retries in fetch */
    _retry?: boolean;
    _retryCount?: number;
  }
}

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
