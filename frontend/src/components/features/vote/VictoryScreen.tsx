import React from 'react';
import { ConfettiWrapper } from '@/components/shared';
import { VictoryAnimation, VictoryTitle, FinalWinnerCard, SessionStats, VictoryActions } from './VictoryComponents';
import type { TournamentVoteResult } from '@/types/tournament.types';

interface VictoryScreenProps {
    showConfetti: boolean;
    lastVoteResult: TournamentVoteResult | null;
    onNewTournament: () => void;
    loading: boolean;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
                                                                showConfetti,
                                                                lastVoteResult,
                                                                onNewTournament,
                                                                loading
                                                            }) => (
    <div className="min-h-[70vh] flex items-center justify-center">
        <ConfettiWrapper show={showConfetti} type="victory" />

        <div className="text-center space-y-8 max-w-2xl mx-auto p-8">
            <VictoryAnimation />
            <VictoryTitle />
            {lastVoteResult?.finalWinner && (
                <FinalWinnerCard winner={lastVoteResult.finalWinner} />
            )}
            {lastVoteResult && <SessionStats lastVoteResult={lastVoteResult} />}
            <VictoryActions onNewTournament={onNewTournament} loading={loading} />
        </div>
    </div>
);