import { QueryClient, DefaultOptions } from '@tanstack/react-query';

/**
 * React Query Configuration
 */

const queryConfig: DefaultOptions = {
  queries: {
    // Global query options
    retry: 1, // Retry failed requests once
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true, // Refetch on component mount
    refetchOnReconnect: true, // Refetch when reconnecting
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Cache for 10 minutes (formerly cacheTime)
  },
  mutations: {
    // Global mutation options
    retry: 0, // Don't retry mutations
  },
};

/**
 * Create Query Client
 */
export const createQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
};

// Singleton instance for client-side
let browserQueryClient: QueryClient | undefined = undefined;

/**
 * Get Query Client
 * Creates a new instance on server, reuses instance on client
 */
export const getQueryClient = (): QueryClient => {
  if (typeof window === 'undefined') {
    // Server: always create a new query client
    return createQueryClient();
  } else {
    // Browser: create query client if it doesn't exist
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
};
