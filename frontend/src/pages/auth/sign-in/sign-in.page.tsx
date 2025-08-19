import React from 'react';
import { ISignInPageProps } from './types/sign-in-page.types';
import { SIGN_IN_PAGE_CONFIG } from './config/sign-in-page.config';
import { SignInForm } from '../../../features/auth/sign-in/ui/sign-in-form.component';
import { useSignInPage } from './hooks/use-sign-in-page.hook';

export const SignInPage: React.FC<ISignInPageProps> = ({ redirectTo = SIGN_IN_PAGE_CONFIG.defaultRedirectTo }) => {
  const { onSuccess } = useSignInPage();

  return <SignInForm redirectTo={redirectTo} onSuccess={onSuccess} />;
};
