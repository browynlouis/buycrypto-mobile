import 'styled-components/native';

import { AppTheme } from '@/styles';

declare module 'styled-components/native' {
  export interface DefaultTheme extends AppTheme {}
}
