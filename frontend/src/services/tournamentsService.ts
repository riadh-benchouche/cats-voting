import {apiClient} from './api';
import type {
    TournamentPair,
    TournamentVoteResult,
    TournamentStats,
    TournamentSession,
    TournamentEndResult,
} from '@/types/tournament.types.ts';
import type {UserVotesHistory} from "@/types/vote.types.ts";

class TournamentsService {
    /**
     * Begin a new tournament session
     */
    async startTournament(): Promise<TournamentSession> {
        try {
            const response = await apiClient.post<TournamentSession>('/votes/tournament/start');
            return response.data;
        } catch (error) {
            console.error('Error while starting tournament:', error);
            throw error;
        }
    }

    /**
     * Get the current tournament pair (Champion vs Challenger)
     */
    async getCurrentPair(): Promise<TournamentPair> {
        try {
            const response = await apiClient.get<TournamentPair>('/votes/tournament/current-pair');
            return response.data;
        } catch (error) {
            console.error('Error while fetching current tournament pair:', error);
            throw error;
        }
    }

    /**
     * Vote for the winner in the current tournament pair
     */
    async voteInTournament(winnerCatId: string): Promise<TournamentVoteResult> {
        try {
            const response = await apiClient.post<TournamentVoteResult>(`/votes/tournament/vote/${winnerCatId}`);
            return response.data;
        } catch (error) {
            console.error(`Error while voting for cat ${winnerCatId} in tournament:`, error);
            throw error;
        }
    }

    /**
     * Get statistics for the current tournament
     */
    async getTournamentStats(): Promise<TournamentStats> {
        try {
            const response = await apiClient.get<TournamentStats>('/votes/tournament/stats');
            return response.data;
        } catch (error) {
            console.error('Error while fetching tournament stats:', error);
            throw error;
        }
    }

    /**
     * End the current tournament and get results
     */
    async endTournament(): Promise<TournamentEndResult> {
        try {
            const response = await apiClient.post<TournamentEndResult>('/votes/tournament/end');
            return response.data;
        } catch (error) {
            console.error('Error while ending tournament:', error);
            throw error;
        }
    }

    /**
     * Get the user's voting history
     */
    async getUserHistory(): Promise<UserVotesHistory> {
        try {
            const response = await apiClient.get<UserVotesHistory>('/votes/history');
            return response.data;
        } catch (error) {
            console.error('Error while fetching user votes history:', error);
            throw error;
        }
    }
}

export const tournamentService = new TournamentsService();