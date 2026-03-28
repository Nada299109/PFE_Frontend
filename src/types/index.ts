/**
 * Common types and interfaces used across the application
 * Module-specific types should be defined in their respective modules
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize?: number;
    totalPages: number;
    totalItems: number;
  };
}

// Re-export module types for convenience
export type { User } from '@/modules/users';
export type {
  AuthUser,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/modules/auth';
