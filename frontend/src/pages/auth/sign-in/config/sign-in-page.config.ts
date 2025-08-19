import { RouterKeys } from '../../../../shared/constants/router-keys.const';

export const SIGN_IN_PAGE_CONFIG = {
  defaultRedirectTo: RouterKeys.QUIZ.LIST,
  title: 'Sign In',
  description: 'Welcome back to Quiz Builder',
} as const;
