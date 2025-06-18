import {apiClient} from './api';
import type {Cat, CatStats} from '@/types/cat.types';

class CatsService {
    /**
     * Get statistics about cats
     */
    async getStats(): Promise<CatStats> {
        try {
            const response = await apiClient.get<CatStats>('/cats/stats');
            return response.data;
        } catch (error) {
            console.error('Error while fetching cat stats:', error);
            throw error;
        }
    }

    /**
     * Get all cats
     */
    async getAllCats(): Promise<Cat[]> {
        try {
            const response = await apiClient.get<Cat[]>('/cats');
            return response.data;
        } catch (error) {
            console.error('Error while fetching all cats:', error);
            throw error;
        }
    }

    /**
     * Get the ranking of cats
     */
    async getRanking(): Promise<Cat[]> {
        try {
            const response = await apiClient.get<Cat[]>('/cats/ranking');
            return response.data;
        } catch (error) {
            console.error('Error while fetching cat ranking:', error);
            throw error;
        }
    }

    /**
     * Get a cat by its ID
     */
    async getCatById(id: string): Promise<Cat> {
        try {
            const response = await apiClient.get<Cat>(`/cats/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error while fetching cat with ID ${id}:`, error);
            throw error;
        }
    }
}

export const catsService = new CatsService();