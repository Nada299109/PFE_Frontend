import { tokenManager } from '@/lib/network';
import { ApiResponse, RequestConfig } from '@/lib/network/types';
import { BaseApiService } from '@/services/api.service';

import type { AuthResponse, LoginCredentials, RegisterData } from '../types';

/**
 * Authentication Service
 * Handles authentication-related API calls
 */
class AuthService extends BaseApiService {
  private readonly endpoint = '/auth';

  /**
   * Login user
   */
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await this.post<ApiResponse<AuthResponse>>(
      `${this.endpoint}/login`,
      credentials,
      { skipAuth: true } as RequestConfig
    );

    // Store tokens
    if (response.data) {
      tokenManager.setAccessToken(response.data.accessToken);
      tokenManager.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    const response = await this.post<ApiResponse<AuthResponse>>(
      `${this.endpoint}/register`,
      data,
      { skipAuth: true } as RequestConfig
    );

    // Store tokens
    if (response.data) {
      tokenManager.setAccessToken(response.data.accessToken);
      tokenManager.setRefreshToken(response.data.refreshToken);
    }

    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.post(`${this.endpoint}/logout`);
    } finally {
      // Clear tokens regardless of API response
      tokenManager.clearTokens();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const refreshToken = tokenManager.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.post<ApiResponse<{ accessToken: string }>>(
      `${this.endpoint}/refresh`,
      { refreshToken },
      { skipAuth: true } as RequestConfig
    );

    if (response.data) {
      tokenManager.setAccessToken(response.data.accessToken);
    }

    return response;
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    return this.get<ApiResponse<AuthResponse['user']>>(
      `${this.endpoint}/profile`
    );
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!tokenManager.getAccessToken();
  }
}

export const authService = new AuthService();
