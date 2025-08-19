import { IUser } from '../../../../entities/user/model';

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface IAuthActions {
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  clearAuth: () => void;
}

export type IAuthStore = IAuthState & IAuthActions;
