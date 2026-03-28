import { InternalAxiosRequestConfig } from 'axios';

import { RequestConfig } from '../types';

/**
 * Authentication Interceptor
 * Handles adding auth tokens to requests
 */

// Token management
export const tokenManager = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', token);
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('refreshToken', token);
  },

  clearTokens: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

/**
 * Request interceptor to add authentication token
 */
export const authRequestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const requestConfig = config as RequestConfig;

  // Skip auth if explicitly requested
  if (requestConfig.skipAuth) {
    return config;
  }

  const token = tokenManager.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Request error interceptor
 */
export const authRequestErrorInterceptor = (error: any): Promise<any> => {
  return Promise.reject(error);
};
