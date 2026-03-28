import { httpClient } from '@/lib/network';
import { RequestConfig } from '@/lib/network/types';

/**
 * Base API Service
 * All domain-specific services should extend this class
 */
export abstract class BaseApiService {
  /**
   * GET request
   */
  protected async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return httpClient.get<T>(endpoint, config);
  }

  /**
   * POST request
   */
  protected async post<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return httpClient.post<T>(endpoint, data, config);
  }

  /**
   * PUT request
   */
  protected async put<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return httpClient.put<T>(endpoint, data, config);
  }

  /**
   * PATCH request
   */
  protected async patch<T>(
    endpoint: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    return httpClient.patch<T>(endpoint, data, config);
  }

  /**
   * DELETE request
   */
  protected async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<T> {
    return httpClient.delete<T>(endpoint, config);
  }
}

/**
 * Export httpClient for direct usage if needed
 */
export { httpClient };
