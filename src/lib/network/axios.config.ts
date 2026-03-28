import axios, { AxiosInstance } from 'axios';

import { config } from '@/config';

/**
 * Create base Axios instance
 * This is the foundation of our network layer
 */
export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: config.api.timeout,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: false, // Set to true if you need to send cookies
  });

  return instance;
};

// Export the default instance
export const axiosInstance = createAxiosInstance();
