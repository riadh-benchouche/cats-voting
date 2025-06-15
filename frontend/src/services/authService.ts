import type {LoginCredentials, RegisterCredentials, AuthResponse} from '@/types/auth.types';
import {apiClient} from "@/services/api.ts";

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        try {
            const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    getGoogleAuthUrl(): string {
        return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/google`;
    }

    getGithubAuthUrl(): string {
        return `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/github`;
    }

    setToken(token: string): void {
        localStorage.setItem('auth_token', token);
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    removeToken(): void {
        localStorage.removeItem('auth_token');
    }

    setUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): any {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    removeUser(): void {
        localStorage.removeItem('user');
    }
}

export const authService = new AuthService();