import { motion } from 'framer-motion';
import { Crown, Target, Timer, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ANIMATION_VARIANTS } from '@/constants';
import { formatters } from '@/utils';
import type { Cat } from '@/types/cat.types';
import type { TournamentVoteResult } from '@/types/tournament.types';

export const VictoryAnimation: React.FC = () => (
    <motion.div
        className="relative"
        variants={ANIMATION_VARIANTS.victoryCard}
        initial="initial"
        animate="animate"
    >
        <div className="text-8xl animate-bounce mb-4">🏆</div>
        <div className="absolute inset-0 animate-ping">
            <div className="text-8xl opacity-75">🏆</div>
        </div>
    </motion.div>
);

export const VictoryTitle: React.FC = () => (
    <motion.div
        className="space-y-4"
        variants={ANIMATION_VARIANTS.slideInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
    >
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-600">
            Tournoi Terminé !
        </h1>
        <p className="text-xl text-muted-foreground">
            Tous les chats ont été affrontés !
        </p>
    </motion.div>
);

export const FinalWinnerCard: React.FC<{ winner: Cat }> = ({ winner }) => (
    <motion.div
        className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl p-8 border-2 border-yellow-400/50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
    >
        <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-yellow-700">
                <Crown className="w-8 h-8" />
                Champion Final
            </div>
            <div className="flex flex-col items-center space-y-4">
                <motion.img
                    src={winner.image}
                    alt={`Champion ${winner.id}`}
                    className="w-32 h-32 object-cover rounded-full border-4 border-yellow-400 shadow-2xl"
                    initial={{ scale: 0, rotate: -360 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 100 }}
                />
                <div className="text-center">
                    <h3 className="text-2xl font-bold">Chat #{winner.id}</h3>
                    <p className="text-lg text-muted-foreground">
                        {formatters.votes(winner.votes)} victoires au total
                    </p>
                </div>
            </div>
        </div>
    </motion.div>
);

export const SessionStats: React.FC<{ lastVoteResult: TournamentVoteResult }> = ({ lastVoteResult }) => {
    const stats = [
        {
            icon: Target,
            value: lastVoteResult.totalRounds || 0,
            label: "Rounds totaux",
            color: "text-blue-500"
        },
        {
            icon: Timer,
            value: formatters.duration(lastVoteResult.sessionDuration || 0),
            label: "Durée totale",
            color: "text-green-500"
        },
        {
            icon: Flame,
            value: lastVoteResult.streak,
            label: "Streak final",
            color: "text-orange-500"
        }
    ];

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
        >
            {stats.map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-xl p-4 text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
            ))}
        </motion.div>
    );
};

export const VictoryActions: React.FC<{ onNewTournament: () => void; loading: boolean }> = ({ onNewTournament, loading }) => (
    <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
    >
        <Button
            onClick={onNewTournament}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
            {loading ? 'Préparation...' : '🚀 Nouveau Tournoi'}
        </Button>
        <p className="text-sm text-muted-foreground">
            Félicitations ! Vous avez terminé un tournoi complet avec tous les chats ! 🎉
        </p>
    </motion.div>
);