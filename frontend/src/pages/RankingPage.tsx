import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Crown, Filter, Flame, Heart, Search, Target, TrendingUp, Trophy} from 'lucide-react';
import {useCat} from '@/hooks/useCat';
import {PodiumCard} from "@/components/PodiumCard.tsx";
import {StatsCard} from "@/components/StatsCard.tsx";
import {RankingCard} from "@/components/RankingCard.tsx";

export default function RankingPage() {
    const {cats, loading, error, fetchRanking, fetchStats, stats} = useCat();
    const [filterOption, setFilterOption] = useState<'all' | 'top10' | 'rising'>('all');

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([fetchRanking(), fetchStats()]);
            } catch (error) {
                console.error('Error loading ranking data:', error);
            }
        };
        loadData();
    }, [fetchRanking, fetchStats]);

    const filteredCats = cats.filter(cat => {
        switch (filterOption) {
            case 'top10':
                return cats.indexOf(cat) < 10;
            case 'rising':
                const position = cats.indexOf(cat) + 1;
                return cat.votes > 0 && (cat.votes / position) > 0.5;
            default:
                return true;
        }
    });

    // Loading state
    if (loading && cats.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div
                        className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="text-xl font-semibold text-muted-foreground">Chargement du classement...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && cats.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-lg text-destructive">Erreur lors du chargement du classement</p>
                    <button
                        onClick={() => fetchRanking()}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-8">
            {/* Header avec stats globales */}
            <motion.div
                className="text-center space-y-6"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground flex items-center justify-center gap-4">
                        <Trophy className="text-yellow-500 animate-pulse"/>
                        Classement CatMash
                        <Trophy className="text-yellow-500 animate-pulse"/>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Découvrez les chats les plus aimés de la communauté
                    </p>
                </div>

                {/* Stats globales */}
                {stats && (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{delay: 0.3, duration: 0.5}}
                    >
                        <StatsCard
                            icon={Target}
                            value={stats.totalCats}
                            label="Chats Total"
                            color="text-blue-600"
                            bgColor="bg-gradient-to-br from-blue-500/10 to-blue-600/10"
                            borderColor="border-blue-500/20"
                        />
                        <StatsCard
                            icon={Heart}
                            value={stats.totalVotes}
                            label="Votes Total"
                            color="text-green-600"
                            bgColor="bg-gradient-to-br from-green-500/10 to-green-600/10"
                            borderColor="border-green-500/20"
                        />
                        <StatsCard
                            icon={Flame}
                            value={stats.recentVotes}
                            label="Votes 24h"
                            color="text-orange-600"
                            bgColor="bg-gradient-to-br from-orange-500/10 to-orange-600/10"
                            borderColor="border-orange-500/20"
                        />
                        <StatsCard
                            icon={TrendingUp}
                            value={Math.round((stats.totalVotes / stats.totalCats) * 10) / 10}
                            label="Moy. Votes"
                            color="text-purple-600"
                            bgColor="bg-gradient-to-br from-purple-500/10 to-purple-600/10"
                            borderColor="border-purple-500/20"
                        />
                    </motion.div>
                )}
            </motion.div>

            {/* Podium des 3 premiers */}
            {cats.length >= 3 && (
                <motion.div
                    className="max-w-4xl mx-auto"
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.5, duration: 0.7}}
                >
                    <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                        <Crown className="text-yellow-500"/>
                        Podium des Champions
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 items-end">
                        <PodiumCard cat={cats[1]} position={2} delay={0.8}/>
                        <PodiumCard cat={cats[0]} position={1} delay={0.7}/>
                        <PodiumCard cat={cats[2]} position={3} delay={0.9}/>
                    </div>
                </motion.div>
            )}

            {/* Filtres */}
            <motion.div
                className="flex justify-center md:justify-end max-w-6xl mx-auto px-4"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1, duration: 0.5}}
            >
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-muted-foreground"/>
                    <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value as 'all' | 'top10' | 'rising')}
                        className="px-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">Tous les chats</option>
                        <option value="top10">Top 10</option>
                        <option value="rising">En progression</option>
                    </select>
                </div>
            </motion.div>

            {/* Classement complet */}
            <motion.div
                className="max-w-6xl mx-auto px-4"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.2, duration: 0.5}}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Classement Complet ({filteredCats.length} chats)
                </h2>

                <AnimatePresence mode="wait">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCats.map((cat, index) => {
                            const rank = cats.indexOf(cat) + 1;
                            return (
                                <RankingCard
                                    key={cat.id}
                                    cat={cat}
                                    rank={rank}
                                    topCatVotes={cats[0]?.votes || 0}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                </AnimatePresence>

                {/* Message si aucun résultat */}
                {filteredCats.length === 0 && (
                    <motion.div
                        className="text-center py-12"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                    >
                        <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4"/>
                        <h3 className="text-xl font-semibold mb-2">Aucun chat trouvé</h3>
                        <p className="text-muted-foreground">
                            Essayez de modifier vos critères de recherche ou de filtrage.
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}