import {motion, AnimatePresence} from 'framer-motion';
import {Crown, RotateCcw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {CatCard} from './CatCard';
import {ANIMATION_VARIANTS} from '@/constants';
import type {TournamentPair} from '@/types/tournament.types';
import type {AnimatingCats} from '@/types/shared.types';

interface BattleHeaderProps {
    onNewTournament: () => void;
    loading: boolean;
    votingInProgress: boolean;
}

interface CatsGridProps {
    currentPair: TournamentPair;
    animatingCats: AnimatingCats;
    votingInProgress: boolean;
    onVote: (catId: string) => void;
    isVotingForCat: (catId: string) => boolean;
}

export const BattleHeader: React.FC<BattleHeaderProps> = ({onNewTournament, loading, votingInProgress}) => (
    <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
            <Crown className="text-yellow-500 animate-pulse"/>
            Tournoi CatMash
            <Crown className="text-yellow-500 animate-pulse"/>
        </h1>
        <div className="flex items-center justify-center gap-4">
            <Button
                onClick={onNewTournament}
                className="flex items-center gap-2 px-4 py-2 bg-background   hover:bg-secondary/80 rounded-lg transition-colors text-sm text-foreground"
                disabled={loading || votingInProgress}
            >
                <RotateCcw className="w-4 h-4"/>
                Nouveau tournoi
            </Button>
        </div>
    </div>
);

export const VSBadge: React.FC = () => (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-2xl md:text-3xl px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl animate-pulse border-4 border-white">
            VS
        </div>
    </div>
);

export const CatsGrid: React.FC<CatsGridProps> = ({
                                                      currentPair,
                                                      animatingCats,
                                                      votingInProgress,
                                                      onVote,
                                                      isVotingForCat
                                                  }) => (
    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
            <CatCard
                cat={currentPair.champion}
                type="champion"
                animatingCats={animatingCats}
                votingInProgress={votingInProgress}
                onVote={onVote}
                isVotingForCat={isVotingForCat}
            />
        </AnimatePresence>

        <AnimatePresence mode="wait">
            <CatCard
                cat={currentPair.challenger}
                type="challenger"
                animatingCats={animatingCats}
                votingInProgress={votingInProgress}
                onVote={onVote}
                isVotingForCat={isVotingForCat}
            />
        </AnimatePresence>
    </div>
);

export const LoadingOverlay: React.FC = () => (
    <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        variants={ANIMATION_VARIANTS.fadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
    >
        <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-2xl">
            <div
                className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"/>
            <p className="text-card-foreground text-lg font-semibold">Nouveau challenger en approche...</p>
        </div>
    </motion.div>
);
