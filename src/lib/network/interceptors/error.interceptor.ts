import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast'; // You can add this package or use your toast library

import { ApiError, RequestConfig } from '../types';

import { tokenManager } from './auth.interceptor';

/**
 * Error Interceptor
 * Handles API errors and provides user-friendly messages
 */

/**
 * Parse error response to ApiError format
 */
export const parseErrorResponse = (error: AxiosError): ApiError => {
  const response = error.response;

  if (!response) {
    return {
      message: 'Network error. Please check your connection.',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  }

  const data = response.data as any;

  return {
    message: data?.message || 'An unexpected error occurred',
    code: data?.code || `HTTP_${response.status}`,
    status: response.status,
    errors: data?.errors,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Handle different HTTP error statuses
 */
export const handleErrorStatus = (error: ApiError): void => {
  switch (error.status) {
    case 401:
      // Unauthorized - clear tokens and redirect to login
      tokenManager.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      break;

    case 403:
      // Forbidden - show error message
      console.error('Access forbidden:', error.message);
      break;

    case 404:
      // Not found
      console.error('Resource not found:', error.message);
      break;

    case 422:
      // Validation error - handled by forms usually
      console.warn('Validation error:', error.errors);
      break;

    case 500:
    case 502:
    case 503:
      // Server errors
      console.error('Server error:', error.message);
      break;

    default:
      console.error('API error:', error.message);
  }
};

/**
 * Response error interceptor
 */
export const errorResponseInterceptor = async (
  error: AxiosError
): Promise<any> => {
  const originalRequest = error.config as RequestConfig;

  // Skip error handler if explicitly requested
  if (originalRequest?.skipErrorHandler) {
    return Promise.reject(error);
  }

  const apiError = parseErrorResponse(error);

  // Handle specific error statuses
  handleErrorStatus(apiError);

  // Log error for debugging (remove in production or use proper logging)
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', {
      url: originalRequest?.url,
      method: originalRequest?.method,
      error: apiError,
    });
  }

  // Show toast notification if you have toast library
  // Uncomment if using react-hot-toast
  // if (typeof window !== 'undefined' && apiError.status !== 401) {
  //   toast.error(apiError.message);
  // }

  return Promise.reject(apiError);
};

/**
 * Response success interceptor
 */
export const successResponseInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  return response;
};
