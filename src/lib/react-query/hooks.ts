import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';

import { ApiError } from '../network';

/**
 * React Query Hooks Utilities
 * Provides type-safe wrappers for React Query hooks
 */

/**
 * Type-safe useQuery wrapper
 */
export function useTypedQuery<
  TData = unknown,
  TError = ApiError,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TData, TError, TData, TQueryKey>) {
  return useQuery(options);
}

/**
 * Type-safe useMutation wrapper
 */
export function useTypedMutation<
  TData = unknown,
  TError = ApiError,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  return useMutation(options);
}

/**
 * Query key factory
 * Helps create consistent query keys
 */
export const queryKeys = {
  // Authentication
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },

  // Posts
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.posts.lists(), filters] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.posts.details(), id] as const,
  },

  // Add more resource keys as needed...
} as const;

/**
 * Hook to invalidate queries
 */
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidateAuth: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all }),
    invalidateUsers: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all }),
    invalidatePosts: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
    invalidateAll: () => queryClient.invalidateQueries(),
  };
}

/**
 * Hook to prefetch queries
 */
export function usePrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchQuery: <TData = unknown>(
      queryKey: QueryKey,
      queryFn: () => Promise<TData>
    ) => {
      return queryClient.prefetchQuery({
        queryKey,
        queryFn,
      });
    },
  };
}
