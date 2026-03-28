import { AxiosError, AxiosInstance } from 'axios';

import { RequestConfig } from '../types';

/**
 * Retry Interceptor
 * Automatically retries failed requests
 */

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Delay function for retry
 */
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Check if error is retryable
 */
const isRetryableError = (error: AxiosError): boolean => {
  // Retry on network errors or 5xx server errors
  if (!error.response) {
    return true; // Network error
  }

  const status = error.response.status;
  return status >= 500 && status < 600;
};

/**
 * Retry error interceptor
 */
export const retryErrorInterceptor = (axiosInstance: AxiosInstance) => {
  return async (error: AxiosError): Promise<any> => {
    const config = error.config as RequestConfig;

    if (!config) {
      return Promise.reject(error);
    }

    // Initialize retry count
    config.retryAttempts = config.retryAttempts ?? 0;

    // Check if we should retry
    if (config.retryAttempts < MAX_RETRY_ATTEMPTS && isRetryableError(error)) {
      config.retryAttempts += 1;

      // Calculate delay with exponential backoff
      const retryDelay = RETRY_DELAY * Math.pow(2, config.retryAttempts - 1);

      console.warn(
        `Retrying request (${config.retryAttempts}/${MAX_RETRY_ATTEMPTS}) after ${retryDelay}ms:`,
        config.url
      );

      await delay(retryDelay);

      // Retry the request
      return axiosInstance.request(config);
    }

    return Promise.reject(error);
  };
};
