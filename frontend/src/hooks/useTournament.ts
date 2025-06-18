import {useState, useCallback} from 'react';
import type {
    TournamentPair,
    TournamentVoteResult,
    TournamentStats,
} from "@/types/tournament.types";
import type {ApiError} from "@/types/api.types";
import {tournamentService} from "@/services/tournamentsService";
import type {UserVotesHistory} from "@/types/vote.types.ts";

export const useTournament = () => {
    // States for tournament data
    const [currentPair, setCurrentPair] = useState<TournamentPair | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);

    // States for voting
    const [votingInProgress, setVotingInProgress] = useState<string | null>(null);
    const [lastVoteResult, setLastVoteResult] = useState<TournamentVoteResult | null>(null);

    // States for tournament statistics and user history
    const [tournamentStats, setTournamentStats] = useState<TournamentStats | null>(null);
    const [userHistory, setUserHistory] = useState<UserVotesHistory | null>(null);

    /**
     * Begins a new tournament session
     */
    const startNewTournament = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const session = await tournamentService.startTournament();
            await getCurrentTournamentPair();
            return session;
        } catch (err) {
            console.error('Error starting tournament:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Get the current tournament pair (Champion vs Challenger)
     */
    const getCurrentTournamentPair = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const pair = await tournamentService.getCurrentPair();
            setCurrentPair(pair);
            return pair;
        } catch (err) {
            console.error('Error fetching current pair:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Vote for the winner in the current tournament pair
     */
    const voteInTournament = useCallback(async (winnerCatId: string) => {
        if (votingInProgress) return;

        setVotingInProgress(winnerCatId);
        setError(null);
        try {
            const result = await tournamentService.voteInTournament(winnerCatId);
            setLastVoteResult(result);

            if (currentPair) {
                setCurrentPair({
                    champion: result.winner,
                    challenger: result.nextChallenger,
                    round: result.round,
                    sessionId: currentPair.sessionId
                });
            }

            return result;
        } catch (err) {
            console.error(`Error voting for cat ${winnerCatId}:`, err);
            setError(err as ApiError);
            throw err;
        } finally {
            setVotingInProgress(null);
        }
    }, [currentPair, votingInProgress]);

    /**
     * Get statistics for the current tournament
     */
    const fetchTournamentStats = useCallback(async () => {
        setError(null);
        try {
            const stats = await tournamentService.getTournamentStats();
            setTournamentStats(stats);
            return stats;
        } catch (err) {
            console.error('Error fetching tournament stats:', err);
            setError(err as ApiError);
            throw err;
        }
    }, []);

    /**
     * End the current tournament and get results
     */
    const endTournament = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await tournamentService.endTournament();
            setCurrentPair(null);
            setLastVoteResult(null);
            return result;
        } catch (err) {
            console.error('Error ending tournament:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch the user's voting history
     */
    const fetchUserHistory = useCallback(async () => {
        setError(null);
        try {
            const history = await tournamentService.getUserHistory();
            setUserHistory(history);
            return history;
        } catch (err) {
            console.error('Error fetching user history:', err);
            setError(err as ApiError);
            throw err;
        }
    }, []);

    /**
     * Check if the user is currently voting for a specific cat
     */
    const isVotingForCat = useCallback((catId: string): boolean => {
        return votingInProgress === catId;
    }, [votingInProgress]);

    /**
     * Reset the tournament state
     */
    const resetTournamentState = useCallback(() => {
        setCurrentPair(null);
        setLastVoteResult(null);
        setTournamentStats(null);
        setError(null);
    }, []);

    /**
     * Initialize the tournament state
     */
    const initializeTournament = useCallback(async () => {
        try {
            await getCurrentTournamentPair();
            await fetchTournamentStats();
        } catch (error) {
            console.error('Error initializing tournament:', error);
        }
    }, [getCurrentTournamentPair, fetchTournamentStats]);

    return {
        // principal states
        currentPair,
        loading,
        error,
        votingInProgress,
        lastVoteResult,
        tournamentStats,
        userHistory,

        // principales actions
        startNewTournament,
        getCurrentTournamentPair,
        voteInTournament,
        endTournament,

        // secondary actions
        fetchTournamentStats,
        fetchUserHistory,
        resetTournamentState,
        initializeTournament,

        // Helpers
        isVotingForCat,

        // Tournament state checks
        isChampion: (catId: string) => currentPair?.champion.id === catId,
        isChallenger: (catId: string) => currentPair?.challenger.id === catId,
        hasActiveTournament: !!currentPair,
        currentRound: currentPair?.round || 0,
        currentStreak: tournamentStats?.streak || 0,
        sessionDuration: tournamentStats?.sessionDuration || 0,
    };
};