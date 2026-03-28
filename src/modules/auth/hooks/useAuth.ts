import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { queryKeys } from '@/lib/react-query';

import { authService } from '../services/auth.service';
import type { LoginCredentials, RegisterData } from '../types';

/**
 * Authentication API Hooks
 * React Query hooks for authentication operations
 */

/**
 * Hook to check authentication status
 */
export function useAuth() {
  return useQuery({
    queryKey: queryKeys.auth.session(),
    queryFn: () => authService.getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to login
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (response) => {
      // Update auth cache
      queryClient.setQueryData(queryKeys.auth.session(), response.data.user);
      queryClient.setQueryData(queryKeys.auth.profile(), response.data.user);

      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}

/**
 * Hook to register
 */
export function useRegister() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (response) => {
      // Update auth cache
      queryClient.setQueryData(queryKeys.auth.session(), response.data.user);
      queryClient.setQueryData(queryKeys.auth.profile(), response.data.user);

      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}

/**
 * Hook to logout
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();

      // Redirect to login
      router.push('/login');
    },
  });
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: () => authService.getCurrentUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const { data, isLoading } = useAuth();
  return {
    isAuthenticated: !!data?.data,
    isLoading,
  };
}
