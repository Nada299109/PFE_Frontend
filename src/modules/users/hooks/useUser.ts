import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys, useInvalidateQueries } from '@/lib/react-query';

import { userService } from '../services/user.service';
import type { User } from '../types';

/**
 * User API Hooks
 * React Query hooks for user-related operations
 */

/**
 * Hook to fetch all users
 */
export function useUsers(params?: {
  page?: number;
  pageSize?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: queryKeys.users.list(params || {}),
    queryFn: () => userService.getUsers(params),
  });
}

/**
 * Hook to fetch single user
 */
export function useUser(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: options?.enabled ?? true,
  });
}

/**
 * Hook to fetch current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: () => userService.getCurrentUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to create user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();
  const { invalidateUsers } = useInvalidateQueries();

  return useMutation({
    mutationFn: (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) =>
      userService.createUser(data),
    onSuccess: () => {
      invalidateUsers();
    },
  });
}

/**
 * Hook to update user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
    }) => userService.updateUser(id, data),
    onSuccess: (response, variables) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.users.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
}

/**
 * Hook to delete user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
}

/**
 * Hook to prefetch user
 */
export function usePrefetchUser() {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.users.detail(id),
      queryFn: () => userService.getUserById(id),
    });
  };
}
