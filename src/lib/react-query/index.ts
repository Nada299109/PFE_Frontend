/**
 * React Query
 * Central export point for React Query functionality
 */

export { QueryProvider } from './QueryProvider';
export { createQueryClient, getQueryClient } from './query-client';
export {
  useTypedQuery,
  useTypedMutation,
  useInvalidateQueries,
  usePrefetch,
  queryKeys,
} from './hooks';
