import { RouterKeys } from '../../../../shared/constants/router-keys.const';

export const SIGN_UP_PAGE_CONFIG = {
  defaultRedirectTo: RouterKeys.QUIZ.LIST,
  title: 'Sign Up',
  description: 'Create your Quiz Builder account',
} as const;
