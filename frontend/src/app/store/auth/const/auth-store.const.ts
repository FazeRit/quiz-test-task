import { IAuthState } from '../types/auth-store.types';

export const AUTH_STORE_NAME = 'auth-storage';

export const AUTH_INITIAL_STATE: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
