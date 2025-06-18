import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {
    Crown,
    Trophy,
    Heart,
    TrendingUp,
    Target,
    ArrowRight,
    Sparkles,
} from 'lucide-react';
import {useCat} from '@/hooks/useCat';
import {useTournament} from '@/hooks/useTournament';
import {StatsCard} from '@/components/StatsCard';
import {PodiumCard} from '@/components/PodiumCard';

export default function HomePage() {
    const {fetchStats, stats, fetchRanking, cats} = useCat();
    const {initializeTournament} = useTournament();
    const [heroImageIndex, setHeroImageIndex] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    fetchStats(),
                    fetchRanking(),
                ]);
            } catch (error) {
                console.error('Error loading homepage data:', error);
            }
        };
        loadData();
    }, [fetchStats, fetchRanking, initializeTournament]);

    // Animation des images hero
    useEffect(() => {
        if (cats.length > 0) {
            const interval = setInterval(() => {
                setHeroImageIndex(prev => (prev + 1) % Math.min(cats.length, 6));
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [cats.length]);

    const handleStartTournament = () => {
        window.location.href = '/vote';
    };

    const handleViewRanking = () => {
        window.location.href = '/ranking';
    };

    const topCats = cats.slice(0, 3);
    const heroImages = cats.slice(0, 6);

    return (
        <div className="relative space-y-16">
            {/* Hero Section avec fond pleine largeur */}
            <section className="relative flex items-center overflow-hidden">
                {/* Content container */}
                <div className="relative w-full max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left content */}
                        <motion.div
                            className="text-center lg:text-left z-10"
                            initial={{opacity: 0, x: -50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.8}}
                        >
                            {/* Badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-4 py-2 mb-6"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                whileHover={{scale: 1.05}}
                            >
                                <Sparkles className="w-4 h-4 text-purple-500"/>
                                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                    Le tournoi de chats le plus mignon du web !
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.3}}
                            >
                                <span
                                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
                                    CatMash
                                </span>
                                <br/>
                                <span className="text-foreground text-4xl md:text-5xl">
                                    Tournoi Ultimate
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.4}}
                            >
                                Affrontez tous les chats dans des duels épiques ! Votez pour vos favoris,
                                découvrez les champions et participez au classement mondial.
                                <br/>
                                <span className="font-semibold text-lg text-purple-600 dark:text-purple-400">
                                    Qui sera le chat ultime ? 🐱
                                </span>
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{delay: 0.5}}
                            >
                                <motion.button
                                    onClick={handleStartTournament}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                    <div className="relative flex items-center justify-center gap-3">
                                        <>
                                            <Crown className="w-6 h-6"/>
                                            Commencer le tournoi
                                        </>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                                    </div>
                                </motion.button>

                                <motion.button
                                    onClick={handleViewRanking}
                                    className="px-8 py-4 border-2 border-border hover:border-purple-500/50 bg-background/80 backdrop-blur-sm hover:bg-purple-500/5 font-semibold rounded-xl transition-all duration-300"
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <Trophy className="w-6 h-6 text-yellow-500"/>
                                        Voir le classement
                                    </div>
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        {/* Right content - Hero Images */}
                        <motion.div
                            className="relative z-10"
                            initial={{opacity: 0, x: 50}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                        >
                            {heroImages.length > 0 && (
                                <div className="relative w-full max-w-sm mx-auto">
                                    {/* Main hero image */}
                                    <motion.div
                                        className="relative z-10"
                                        key={heroImageIndex}
                                        initial={{opacity: 0, scale: 0.8, rotate: -5}}
                                        animate={{opacity: 1, scale: 1, rotate: 0}}
                                        transition={{duration: 0.6}}
                                    >
                                        <div className="relative">
                                            <img
                                                src={heroImages[heroImageIndex]?.image}
                                                alt="Chat hero"
                                                className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-gray-800"
                                            />
                                            <div
                                                className="absolute -top-8 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                                                <Crown className="w-6 h-6"/>
                                            </div>
                                            {/* Glow effect */}
                                            <div
                                                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10"/>
                                        </div>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {stats && (
                <section className="">
                    <motion.div
                        className="max-w-6xl mx-auto px-4"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                    >
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold mb-4"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                            >
                                CatMash en Chiffres
                            </motion.h2>
                            <motion.p
                                className="text-lg text-muted-foreground"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                viewport={{once: true}}
                            >
                                Rejoignez une communauté passionnée de chats !
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                viewport={{once: true}}
                            >
                                <StatsCard
                                    icon={Target}
                                    value={stats.totalCats}
                                    label="Chats Participants"
                                    color="text-blue-600"
                                    bgColor="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20"
                                    borderColor="border-blue-200/50"
                                />
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.2}}
                                viewport={{once: true}}
                            >
                                <StatsCard
                                    icon={Heart}
                                    value={stats.totalVotes.toLocaleString()}
                                    label="Votes Totaux"
                                    color="text-green-600"
                                    bgColor="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20"
                                    borderColor="border-green-200/50"
                                />
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.4}}
                                viewport={{once: true}}
                            >
                                <StatsCard
                                    icon={TrendingUp}
                                    value={Math.round((stats.totalVotes / stats.totalCats) * 10) / 10}
                                    label="Moy. par Chat"
                                    color="text-purple-600"
                                    bgColor="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20"
                                    borderColor="border-purple-200/50"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Top 3 Preview */}
            {topCats.length >= 3 && (
                <section>
                    <motion.div
                        className="max-w-6xl mx-auto px-4"
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        viewport={{once: true}}
                    >
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                            >
                                <Crown className="text-yellow-500"/>
                                Champions Actuels
                                <Crown className="text-yellow-500"/>
                            </motion.h2>
                            <motion.p
                                className="text-lg text-muted-foreground"
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: 0.1}}
                                viewport={{once: true}}
                            >
                                Les chats les plus aimés de la communauté
                            </motion.p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 items-end justify-center">
                            {/* 2ème place */}
                            <div className="order-1 md:order-1">
                                <PodiumCard cat={topCats[1]} position={2} delay={0.1}/>
                            </div>

                            {/* 1ère place */}
                            <div className="order-2 md:order-2">
                                <PodiumCard cat={topCats[0]} position={1} delay={0.2}/>
                            </div>

                            {/* 3ème place */}
                            <div className="order-3 md:order-3">
                                <PodiumCard cat={topCats[2]} position={3} delay={0.3}/>
                            </div>
                        </div>

                        <motion.div
                            className="text-center mt-12"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: 0.5}}
                            viewport={{once: true}}
                        >
                            <motion.button
                                onClick={handleViewRanking}
                                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                Voir le classement complet
                                <ArrowRight className="w-5 h-5"/>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </section>
            )}

            {/* How it works */}
            <section>
                <motion.div
                    className="max-w-6xl mx-auto px-4"
                    initial={{opacity: 0, y: 50}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    viewport={{once: true}}
                >
                    <div className="text-center mb-12">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold mb-4"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                        >
                            Comment ça marche ?
                        </motion.h2>
                        <motion.p
                            className="text-lg text-muted-foreground"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: 0.1}}
                            viewport={{once: true}}
                        >
                            Participer au tournoi CatMash est simple comme bonjour !
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                step: 1,
                                title: "Affrontez les chats",
                                description: "Deux chats s'affrontent : un champion et un challenger. Choisissez votre favori en cliquant dessus !",
                                gradient: "from-purple-500 to-pink-500"
                            },
                            {
                                step: 2,
                                title: "Construisez votre streak",
                                description: "Le gagnant devient le nouveau champion et affronte le prochain challenger. Créez la plus longue série de victoires !",
                                gradient: "from-pink-500 to-orange-500"
                            },
                            {
                                step: 3,
                                title: "Découvrez le champion",
                                description: "Quand tous les chats ont été affrontés, le champion final est couronné ! Consultez le classement pour voir les résultats.",
                                gradient: "from-orange-500 to-yellow-500"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                className="text-center p-6 bg-card rounded-2xl border border-border hover:border-purple-500/50 transition-all duration-300 group"
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{delay: index * 0.1}}
                                viewport={{once: true}}
                                whileHover={{scale: 1.02}}
                            >
                                <motion.div
                                    className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                                    whileHover={{rotate: 360}}
                                    transition={{duration: 0.5}}
                                >
                                    <span className="text-2xl font-bold text-white">{item.step}</span>
                                </motion.div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
}