export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    created_at: string;
    updated_at: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<{
        status: number;
        message: string;
    }>;
    register: (credentials: RegisterCredentials) => Promise<{
        status: number;
        message: string;
    }>;
    logout: () => {
        status: number;
        message: string;
    };
    isAuthenticated: boolean;
    updateUser: (user: User) => void;
}

export interface UpdateAccountDto {
    name?: string;
}

export interface UpdatePasswordDto {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
