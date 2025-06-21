import {useState, useCallback} from 'react';
import {usersService} from '@/services/usersService';
import {useAuth} from '@/hooks/useAuth';
import type {ApiError} from '@/types/api.types';
import type {UpdateAccountDto, UpdatePasswordDto} from "@/types/auth.types.ts";

export const useProfile = () => {
    const {user, updateUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState<ApiError | null>(null);

    /**
     * Update account information
     */
    const updateAccount = useCallback(async (data: UpdateAccountDto) => {
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await usersService.updateAccount(user?.id as string, data);
            updateUser(updatedUser);
            return updatedUser;
        } catch (err) {
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [updateUser]);

    /**
     * Update password
     */
    const updatePassword = useCallback(async (data: UpdatePasswordDto) => {
        setPasswordLoading(true);
        setPasswordError(null);
        try {
            await usersService.updatePassword(user?.id as string, data);
        } catch (err) {
            setPasswordError(err as ApiError);
            throw err;
        } finally {
            setPasswordLoading(false);
        }
    }, []);

    /**
     * Clear errors
     */
    const clearErrors = useCallback(() => {
        setError(null);
        setPasswordError(null);
    }, []);

    return {
        // Data
        user,
        loading,
        error,
        passwordLoading,
        passwordError,

        // Actions
        updateAccount,
        updatePassword,
        clearErrors
    };
};
