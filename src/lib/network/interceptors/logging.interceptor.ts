import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/**
 * Logging Interceptor
 * Logs all requests and responses in development
 */

/**
 * Request logging interceptor
 */
export const loggingRequestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      params: config.params,
      data: config.data,
    });
  }

  // Add request timestamp for performance tracking
  (config as any).metadata = { startTime: new Date() };

  return config;
};

/**
 * Response logging interceptor
 */
export const loggingResponseInterceptor = (
  response: AxiosResponse
): AxiosResponse => {
  if (process.env.NODE_ENV === 'development') {
    const duration =
      new Date().getTime() -
        (response.config as any).metadata?.startTime?.getTime() || 0;

    console.log('✅ Response:', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
      duration: `${duration}ms`,
      data: response.data,
    });
  }

  return response;
};

/**
 * Error logging interceptor
 */
export const loggingErrorInterceptor = async (error: any): Promise<any> => {
  if (process.env.NODE_ENV === 'development') {
    const duration = error.config?.metadata?.startTime
      ? new Date().getTime() - error.config.metadata.startTime.getTime()
      : 0;

    console.error('❌ Error:', {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      duration: `${duration}ms`,
      message: error.message,
      data: error.response?.data,
    });
  }

  return Promise.reject(error);
};
