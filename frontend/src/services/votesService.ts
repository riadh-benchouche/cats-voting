import {apiClient} from './api';
import type {Vote, UserVotesHistory} from '@/types/vote.types';

class VotesService {
    /**
     * Vote for a specific cat
     * User must be authenticated
     */
    async voteForCat(catId: string): Promise<void> {
        try {
            await apiClient.post(`/votes/${catId}`);
        } catch (error) {
            console.error(`Error while voting for cat ${catId}:`, error);
            throw error;
        }
    }

    /**
     * Get a user's voting history
     * User must be authenticated
     */
    async getUserVotesHistory(): Promise<UserVotesHistory> {
        try {
            const response = await apiClient.get<UserVotesHistory>('/votes/my-history');
            return response.data;
        } catch (error) {
            console.error('Error while fetching user votes history:', error);
            throw error;
        }
    }

    /**
     * Check if a user has already voted for a specific cat
     * This is a client-side helper that could be used for UI state
     */
    async hasUserVotedForCat(catId: string, userVotes: Vote[]): Promise<boolean> {
        return userVotes.some(vote => vote.cat.id === catId);
    }
}

export const votesService = new VotesService();