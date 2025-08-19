import { ISignInPageHandlers } from '../types/sign-in-page.types';
import { useCallback } from 'react';

export const useSignInPage = (): ISignInPageHandlers => {
  const onSuccess = useCallback(() => {}, []);

  return {
    onSuccess,
  };
};
