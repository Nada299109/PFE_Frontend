import { AxiosError, AxiosInstance } from 'axios';

import { RefreshTokenResponse, RequestConfig } from '../types';

import { tokenManager } from './auth.interceptor';

/**
 * Refresh Token Interceptor
 * Handles automatic token refresh when access token expires
 */

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

/**
 * Process queued requests after token refresh
 */
const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Refresh access token
 */
const refreshAccessToken = async (
  axiosInstance: AxiosInstance
): Promise<string> => {
  const refreshToken = tokenManager.getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await axiosInstance.post<RefreshTokenResponse>(
      '/auth/refresh',
      { refreshToken },
      { skipAuth: true } as RequestConfig
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    tokenManager.setAccessToken(accessToken);
    tokenManager.setRefreshToken(newRefreshToken);

    return accessToken;
  } catch (error) {
    tokenManager.clearTokens();
    throw error;
  }
};

/**
 * Refresh token error interceptor
 */
export const refreshTokenInterceptor = (axiosInstance: AxiosInstance) => {
  return async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as RequestConfig;

    // If error is not 401 or request has already been retried, reject
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      (originalRequest as any)._retry
    ) {
      return Promise.reject(error);
    }

    // Skip refresh for auth endpoints
    if (originalRequest.url?.includes('/auth/')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue the request while token is being refreshed
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosInstance.request(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Mark as retry to prevent infinite loops
    (originalRequest as any)._retry = true;
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken(axiosInstance);
      processQueue(null, newToken);

      // Retry original request with new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }

      return axiosInstance.request(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  };
};
