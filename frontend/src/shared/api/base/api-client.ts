import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { RouterKeys } from '../../constants/router-keys.const';
import { useAuthStore } from '../../../app/store/auth';

type CustomAxiosRequestConfig = {
  skipAuth?: boolean;
  isRetry?: boolean;
} & AxiosRequestConfig;

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  const customConfig = config as CustomAxiosRequestConfig;



  if (!customConfig.skipAuth) {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  response => {

    return response;
  },
  async (error: AxiosError) => {
    const { clearAuth } = useAuthStore.getState();
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest.skipAuth) {
      clearAuth();
      localStorage.removeItem('authToken');

      if (window.location.pathname !== RouterKeys.AUTH.SIGN_IN) {
        window.location.href = RouterKeys.AUTH.SIGN_IN;
      }

      return Promise.reject(new Error('Authentication required'));
    }

    if (error.response?.status === 403) {
      return Promise.reject(new Error('Access forbidden'));
    }

    if (error.response?.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }

    if (error.response?.status && error.response.status >= 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      error.message = (error.response.data as { message: string }).message;
    }
    return Promise.reject(error);
  }
);
