import React, {createContext, type ReactNode} from 'react';
import {useAuth as useAuthHook} from '@/hooks/useAuth';
import type {AuthContextType} from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const authValues = useAuthHook();

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};