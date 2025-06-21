import React from 'react';
import { ConfettiWrapper } from '@/components/shared';
import { BattleHeader, VSBadge, CatsGrid, LoadingOverlay } from './BattleComponents';
import type { TournamentPair } from '@/types/tournament.types';
import type { AnimatingCats } from '@/types/shared.types.ts';

interface BattleArenaProps {
    currentPair: TournamentPair;
    showConfetti: boolean;
    animatingCats: AnimatingCats;
    votingInProgress: boolean;
    onVote: (catId: string) => void;
    onNewTournament: () => void;
    isVotingForCat: (catId: string) => boolean;
    loading: boolean;
}

export const BattleArena: React.FC<BattleArenaProps> = ({
                                                            currentPair,
                                                            showConfetti,
                                                            animatingCats,
                                                            votingInProgress,
                                                            onVote,
                                                            onNewTournament,
                                                            isVotingForCat,
                                                            loading
                                                        }) => (
    <div className="space-y-8">
        <ConfettiWrapper show={showConfetti} type="celebration" />
        <BattleHeader onNewTournament={onNewTournament} loading={loading} votingInProgress={votingInProgress} />

        <div className="relative">
            <VSBadge />
            <CatsGrid
                currentPair={currentPair}
                animatingCats={animatingCats}
                votingInProgress={votingInProgress}
                onVote={onVote}
                isVotingForCat={isVotingForCat}
            />
        </div>

        {loading && currentPair && <LoadingOverlay />}
    </div>
);