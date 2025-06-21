import {apiClient} from './api';
import type {UpdateAccountDto, UpdatePasswordDto, User} from '@/types/auth.types';

class UsersService {
    /**
     * Update user account info (name)
     */
    async updateAccount(userId: string, updateData: UpdateAccountDto): Promise<User> {
        try {
            const response = await apiClient.patch<User>(`users/${userId}/account`, updateData);
            return response.data;
        } catch (error) {
            console.error('Error updating account:', error);
            throw error;
        }
    }

    /**
     * Update user password
     */
    async updatePassword(userId: string, updateData: UpdatePasswordDto): Promise<void> {
        try {
            await apiClient.patch(`users/${userId}/password`, updateData);
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }
}

export const usersService = new UsersService();