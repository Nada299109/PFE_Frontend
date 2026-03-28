import { ApiResponse } from '@/lib/network/types';
import { BaseApiService } from '@/services/api.service';

import type { User } from '../types';

/**
 * User Service
 * Handles all user-related API calls
 */
class UserService extends BaseApiService {
  private readonly endpoint = '/users';

  /**
   * Get all users
   */
  async getUsers(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<ApiResponse<User[]>> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize)
      queryParams.append('pageSize', params.pageSize.toString());
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    const url = query ? `${this.endpoint}?${query}` : this.endpoint;

    return this.get<ApiResponse<User[]>>(url);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<ApiResponse<User>>(`${this.endpoint}/${id}`);
  }

  /**
   * Create new user
   */
  async createUser(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<User>> {
    return this.post<ApiResponse<User>>(this.endpoint, data);
  }

  /**
   * Update user
   */
  async updateUser(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ApiResponse<User>> {
    return this.put<ApiResponse<User>>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get<ApiResponse<User>>('/auth/profile');
  }
}

export const userService = new UserService();
