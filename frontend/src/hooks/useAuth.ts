import {useState, useCallback} from 'react';
import type {LoginCredentials, RegisterCredentials, User} from '@/types/auth.types';
import {authService} from '@/services/authService';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(authService.getUser());
    const [token, setToken] = useState<string | null>(authService.getToken());
    const [isLoading, setIsLoading] = useState(false);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const response = await authService.login(credentials);

            authService.setToken(response.access_token);
            authService.setUser(response.user);

            setToken(response.access_token);
            setUser(response.user);

            return {
                status: 200,
                message: 'success',
            };
        } catch (error) {
            console.error('Error', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const register = useCallback(async (credentials: RegisterCredentials) => {
        setIsLoading(true);
        try {
            const response = await authService.register(credentials);

            authService.setToken(response.access_token);
            authService.setUser(response.user);

            setToken(response.access_token);
            setUser(response.user);

            return {
                status: 200,
                message: 'success',
            };
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        authService.removeToken();
        authService.removeUser();

        setToken(null);
        setUser(null);

        return {
            status: 200,
            message: 'success',
        }
    }, []);

    const isAuthenticated = Boolean(token && user);

    return {
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
    };
};