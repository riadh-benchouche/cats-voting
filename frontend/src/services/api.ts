import axios from 'axios';
import type {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosError} from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    /**
     * Setup Axios interceptors for request and response
     */
    private setupInterceptors(): void {
        /*
         * Request interceptor - Add Authorization header with token
         */
        this.client.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        /*
         * Response interceptor - Handle errors globally
         */
        this.client.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }

                const message = error.message || 'An error occurred';
                return Promise.reject(new Error(message));
            }
        );
    }

    /**
     * HTTP methods for API requests
     */
    get<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
        return this.client.get<T>(url, config);
    }

    post<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
        return this.client.post<T>(url, data, config);
    }

    put<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
        return this.client.put<T>(url, data, config);
    }

    patch<T = any>(url: string, data?: any, config?: any): Promise<AxiosResponse<T>> {
        return this.client.patch<T>(url, data, config);
    }

    delete<T = any>(url: string, config?: any): Promise<AxiosResponse<T>> {
        return this.client.delete<T>(url, config);
    }

    /**
     * Get the Axios instance for direct use
     */
    getInstance(): AxiosInstance {
        return this.client;
    }
}

export const apiClient = new ApiClient();