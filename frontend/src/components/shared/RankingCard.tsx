import {motion} from 'framer-motion';
import {Crown, Medal, Trophy, Star, Heart} from 'lucide-react';

interface Cat {
    id: string;
    image: string;
    votes: number;
}

interface RankingCardProps {
    cat: Cat;
    rank: number;
    topCatVotes: number;
    index: number;
}

export function RankingCard({cat, rank, topCatVotes, index}: RankingCardProps) {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return {icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30'};
            case 2:
                return {icon: Medal, color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30'};
            case 3:
                return {icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-600/10', border: 'border-amber-600/30'};
            default:
                return {icon: Star, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30'};
        }
    };

    const {icon: RankIcon, color, bg, border} = getRankIcon(rank);

    const getBadgeText = (rank: number) => {
        switch (rank) {
            case 1:
                return '👑 Champion';
            case 2:
                return '🥈 Vice-Champion';
            case 3:
                return '🥉 3ème place';
            default:
                return null;
        }
    };

    return (
        <motion.div
            className={`bg-card border ${border} rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 ${bg} hover:scale-[1.02]`}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.03, duration: 0.3}}
            whileHover={{scale: 1.02}}
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${bg} ${border} border-2`}>
                    {rank <= 3 ? (
                        <RankIcon className={`w-5 h-5 ${color}`}/>
                    ) : (
                        <span className="font-bold text-sm">{rank}</span>
                    )}
                </div>

                {rank <= 3 && (
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${bg} ${color} border ${border}`}>
                        {getBadgeText(rank)}
                    </div>
                )}
            </div>

            <div className="relative mb-3">
                <img
                    src={cat.image}
                    alt={`Chat #${cat.id}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-border shadow-sm"
                />
                {rank <= 3 && (
                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 rounded-full p-1">
                        <RankIcon className={`w-4 h-4 ${color}`}/>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 text-red-500"/>
                    <span className="text-lg font-bold">{cat.votes} votes</span>
                </div>

                <div className="text-center">
                    <div className="text-sm text-muted-foreground">
                        {topCatVotes > 0 ? Math.round((cat.votes / topCatVotes) * 100) : 0}% du leader
                    </div>
                </div>
            </div>
        </motion.div>
    );
}