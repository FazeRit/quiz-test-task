import React from 'react';
import { ISignUpPageProps } from './types/sign-up-page.types';
import { SIGN_UP_PAGE_CONFIG } from './config/sign-up-page.config';
import { SignUpForm } from '../../../features/auth/sign-up/ui/sign-up-form.component';
import { useSignUpPage } from './hooks/use-sign-up-page.hook';

export const SignUpPage: React.FC<ISignUpPageProps> = ({ redirectTo = SIGN_UP_PAGE_CONFIG.defaultRedirectTo }) => {
  const { onSuccess } = useSignUpPage();

  return <SignUpForm redirectTo={redirectTo} onSuccess={onSuccess} />;
};
