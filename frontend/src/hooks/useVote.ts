import {useState, useCallback} from 'react';
import type {Vote, UserVotesHistory} from "@/types/vote.types";
import type {ApiError} from "@/types/api.types";
import {votesService} from "@/services/votesService";

export const useVote = () => {
    const [votesHistory, setVotesHistory] = useState<UserVotesHistory | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [votingInProgress, setVotingInProgress] = useState<string | null>(null);

    /**
     * Vote for a specific cat
     */
    const voteForCat = useCallback(async (catId: string) => {
        setVotingInProgress(catId);
        setError(null);
        try {
            await votesService.voteForCat(catId);
            if (votesHistory) {
                await fetchVotesHistory();
            }
        } catch (err) {
            console.error(`Error voting for cat ${catId}:`, err);
            setError(err as ApiError);
            throw err;
        } finally {
            setVotingInProgress(null);
        }
    }, [votesHistory]);

    /**
     * Fetch a user's voting history
     */
    const fetchVotesHistory = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const history = await votesService.getUserVotesHistory();
            setVotesHistory(history);
        } catch (err) {
            console.error('Error fetching votes history:', err);
            setError(err as ApiError);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Check if a user has voted for a specific cat
     */
    const hasVotedForCat = useCallback((catId: string): boolean => {
        if (!votesHistory?.votes) return false;
        return votesHistory.votes.some(vote => vote.cat.id === catId);
    }, [votesHistory]);

    /**
     * Get to vote for a specific cat (if exists)
     */
    const getVoteForCat = useCallback((catId: string): Vote | undefined => {
        if (!votesHistory?.votes) return undefined;
        return votesHistory.votes.find(vote => vote.cat.id === catId);
    }, [votesHistory]);

    /**
     * Clear votes history (useful for logout)
     */
    const clearVotesHistory = useCallback(() => {
        setVotesHistory(null);
        setError(null);
    }, []);

    /**
     * Check if currently voting for a specific cat
     */
    const isVotingForCat = useCallback((catId: string): boolean => {
        return votingInProgress === catId;
    }, [votingInProgress]);

    return {
        // Data
        votesHistory,
        loading,
        error,
        votingInProgress,

        // Actions
        voteForCat,
        fetchVotesHistory,
        clearVotesHistory,

        // Helpers
        hasVotedForCat,
        getVoteForCat,
        isVotingForCat,

        // Computed values
        totalVotes: votesHistory?.totalVotes || 0,
        favoriteCats: votesHistory?.favoriteCats || [],
        stats: votesHistory?.stats || {totalVoted: 0, votingRate: 0}
    };
};