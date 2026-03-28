/**
 * Network Layer
 * Central export point for all network-related functionality
 */

// Main HTTP Client
export { httpClient, HttpClient } from './http-client';

// Axios instance (for advanced usage)
export { axiosInstance } from './axios.config';

// Token Management
export { tokenManager } from './interceptors/auth.interceptor';

// Types
export type {
  ApiError,
  ApiResponse,
  RequestConfig,
  RefreshTokenResponse,
} from './types';

// Interceptors (export for custom configuration if needed)
export {
  authRequestInterceptor,
  authRequestErrorInterceptor,
} from './interceptors/auth.interceptor';

export {
  errorResponseInterceptor,
  successResponseInterceptor,
  parseErrorResponse,
} from './interceptors/error.interceptor';

export {
  loggingRequestInterceptor,
  loggingResponseInterceptor,
  loggingErrorInterceptor,
} from './interceptors/logging.interceptor';

export { retryErrorInterceptor } from './interceptors/retry.interceptor';
export { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
