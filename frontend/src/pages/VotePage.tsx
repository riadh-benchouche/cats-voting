import {useEffect, useState, useCallback, useMemo} from 'react';
import {useTournament} from '@/hooks/useTournament';
import {LoadingScreen, ErrorScreen} from '@/components/shared';
import {VictoryScreen, BattleArena, NoTournamentScreen} from '@/components/features/vote';
import {ANIMATION_DURATIONS} from '@/constants';
import type {AnimatingCats} from '@/types/shared.types';

export default function VotePage() {
    const {
        currentPair,
        loading,
        error,
        voteInTournament,
        startNewTournament,
        isVotingForCat,
        lastVoteResult,
        initializeTournament,
    } = useTournament();

    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [animatingCats, setAnimatingCats] = useState<AnimatingCats>({
        winner: null,
        loser: null,
        direction: null
    });

    const isComplete = useMemo(() => lastVoteResult?.isComplete ?? false, [lastVoteResult]);
    const votingInProgress = useMemo(() =>
            currentPair ? (isVotingForCat(currentPair.champion.id) || isVotingForCat(currentPair.challenger.id)) : false,
        [currentPair, isVotingForCat]
    );

    const resetAnimations = useCallback(() => {
        setAnimatingCats({winner: null, loser: null, direction: null});
    }, []);

    const handleVote = useCallback(async (catId: string) => {
        if (isVotingForCat(catId) || !currentPair) return;

        try {
            const loserCat = currentPair.champion.id === catId ? currentPair.challenger : currentPair.champion;
            const isChampionWinner = currentPair.champion.id === catId;

            setAnimatingCats({
                winner: catId,
                loser: loserCat.id,
                direction: isChampionWinner ? 'right' : 'left'
            });

            await voteInTournament(catId);
            setTimeout(resetAnimations, ANIMATION_DURATIONS.ANIMATION_RESET_TIMEOUT);
        } catch (error) {
            console.error('Error voting:', error);
            resetAnimations();
        }
    }, [currentPair, isVotingForCat, voteInTournament, resetAnimations]);

    const handleNewTournament = useCallback(async () => {
        try {
            setShowConfetti(false);
            resetAnimations();
            await startNewTournament();
        } catch (error) {
            console.error('Error starting new tournament:', error);
        }
    }, [startNewTournament, resetAnimations]);

    useEffect(() => {
        initializeTournament();
    }, [initializeTournament]);

    useEffect(() => {
        if (lastVoteResult && !lastVoteResult.isComplete) {
            setShowConfetti(true);
            const timeout = setTimeout(() => setShowConfetti(false), ANIMATION_DURATIONS.CONFETTI_TIMEOUT);
            return () => clearTimeout(timeout);
        }
        if (lastVoteResult?.isComplete) {
            setShowConfetti(true);
        }
    }, [lastVoteResult]);

    if (isComplete) {
        return (
            <VictoryScreen
                showConfetti={showConfetti}
                lastVoteResult={lastVoteResult}
                onNewTournament={handleNewTournament}
                loading={loading}
            />
        );
    }

    if (loading && !currentPair) {
        return <LoadingScreen message="Préparation du tournoi..."/>;
    }

    if (error && !currentPair) {
        return <ErrorScreen onRetry={handleNewTournament} message="Erreur lors du chargement du tournoi"/>;
    }

    if (!currentPair) {
        return <NoTournamentScreen onStartTournament={handleNewTournament} loading={loading}/>;
    }

    return (
        <BattleArena
            currentPair={currentPair}
            showConfetti={showConfetti && !isComplete}
            animatingCats={animatingCats}
            votingInProgress={votingInProgress}
            onVote={handleVote}
            onNewTournament={handleNewTournament}
            isVotingForCat={isVotingForCat}
            loading={loading}
        />
    );
}