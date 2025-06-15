import React, {createContext, useContext, useState, useEffect, type ReactNode} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
                                                                children,
                                                                defaultTheme = 'system',
                                                                storageKey = 'catmash-theme',
                                                            }) => {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey) as Theme;
        if (storedTheme) {
            setThemeState(storedTheme);
        }
    }, [storageKey]);

    useEffect(() => {
        const updateActualTheme = () => {
            if (theme === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light';
                setActualTheme(systemTheme);
            } else {
                setActualTheme(theme);
            }
        };

        updateActualTheme();

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => updateActualTheme();

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(actualTheme);
    }, [actualTheme]);

    const setTheme = (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        setThemeState(newTheme);
    };

    const value: ThemeContextType = {
        theme,
        setTheme,
        actualTheme,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};