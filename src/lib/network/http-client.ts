import { AxiosInstance } from 'axios';

import { axiosInstance } from './axios.config';
import {
  authRequestErrorInterceptor,
  authRequestInterceptor,
} from './interceptors/auth.interceptor';
import {
  errorResponseInterceptor,
  successResponseInterceptor,
} from './interceptors/error.interceptor';
import {
  loggingErrorInterceptor,
  loggingRequestInterceptor,
  loggingResponseInterceptor,
} from './interceptors/logging.interceptor';
import { refreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { retryErrorInterceptor } from './interceptors/retry.interceptor';
import { RequestConfig } from './types';

/**
 * HTTP Client
 * Configured with all interceptors
 */
class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstance;
    this.setupInterceptors();
  }

  /**
   * Setup all interceptors in the correct order
   */
  private setupInterceptors(): void {
    // Request interceptors (executed in order)
    this.instance.interceptors.request.use(
      loggingRequestInterceptor,
      authRequestErrorInterceptor
    );

    this.instance.interceptors.request.use(
      authRequestInterceptor,
      authRequestErrorInterceptor
    );

    // Response interceptors (executed in reverse order)
    this.instance.interceptors.response.use(
      loggingResponseInterceptor,
      loggingErrorInterceptor
    );

    this.instance.interceptors.response.use(
      successResponseInterceptor,
      refreshTokenInterceptor(this.instance)
    );

    this.instance.interceptors.response.use(
      undefined,
      retryErrorInterceptor(this.instance)
    );

    this.instance.interceptors.response.use(
      undefined,
      errorResponseInterceptor
    );
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  /**
   * Get axios instance for advanced usage
   */
  getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const httpClient = new HttpClient();

// Export the class for testing or creating new instances
export { HttpClient };
