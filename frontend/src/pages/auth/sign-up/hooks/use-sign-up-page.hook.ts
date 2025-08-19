import { ISignUpPageHandlers } from '../types/sign-up-page.types';
import { useCallback } from 'react';

export const useSignUpPage = (): ISignUpPageHandlers => {
  const onSuccess = useCallback(() => {}, []);

  return {
    onSuccess,
  };
};
