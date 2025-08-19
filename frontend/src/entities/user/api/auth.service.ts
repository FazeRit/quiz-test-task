import { apiClient } from '../../../shared/api/base/api-client';
import { ISignInDto, ISignInResponse, ISignUpDto, ISignUpResponse } from '../model';

class AuthService {
  private api = apiClient;

  async signIn(credentials: ISignInDto): Promise<ISignInResponse> {
    const response = await this.api.post<ISignInResponse>('/auth/sign-in', credentials);
    return response.data;
  }

  async signUp(userData: ISignUpDto): Promise<ISignUpResponse> {
    const response = await this.api.post<ISignUpResponse>('/auth/sign-up', userData);
    return response.data;
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  async logout(): Promise<void> {
    try {
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearToken();
    }
  }
}

export const authService = new AuthService();
