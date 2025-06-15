import React, {type ReactNode} from 'react';
import {AuthProvider} from './authContext';
import {ThemeProvider} from './themeContext';
import { Toaster } from "@/components/ui/sonner"

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    return (
        <ThemeProvider defaultTheme="system" storageKey="catmash-theme">
            <AuthProvider>
                {children}
                <Toaster />
            </AuthProvider>
        </ThemeProvider>
    );
};