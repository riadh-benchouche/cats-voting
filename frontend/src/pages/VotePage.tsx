import {useEffect, useState} from 'react';
import {Heart, RotateCcw, Crown, Flame, Timer, Target} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import Confetti from 'react-confetti';
import {useTournament} from '@/hooks/useTournament';
import {Button} from "@/components/ui/button.tsx";

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

    // États pour les animations
    const [showConfetti, setShowConfetti] = useState(false);
    const [animatingCats, setAnimatingCats] = useState<{
        winner: string | null;
        loser: string | null;
        direction: 'left' | 'right' | null;
    }>({
        winner: null,
        loser: null,
        direction: null
    });

    // Initialiser le tournoi au chargement
    useEffect(() => {
        initializeTournament();
    }, [initializeTournament]);

    // Gérer les confetti pour les victoires
    useEffect(() => {
        if (lastVoteResult && !lastVoteResult.isComplete) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        if (lastVoteResult?.isComplete) {
            setShowConfetti(true);
        }
    }, [lastVoteResult]);

    const handleVote = async (catId: string) => {
        if (isVotingForCat(catId) || !currentPair) return;

        try {
            // Démarrer l'animation avant le vote
            const loserCat = currentPair.champion.id === catId ? currentPair.challenger : currentPair.champion;
            const isChampionWinner = currentPair.champion.id === catId;

            setAnimatingCats({
                winner: catId,
                loser: loserCat.id,
                direction: isChampionWinner ? 'right' : 'left'
            });

            const result = await voteInTournament(catId);

            // Réinitialiser les animations après un délai
            setTimeout(() => {
                setAnimatingCats({
                    winner: null,
                    loser: null,
                    direction: null
                });
            }, 800);

            if (result?.isComplete) {
                console.log('🏆 Tournoi terminé !', result);
            }
        } catch (error) {
            console.error('Error voting:', error);
            // Réinitialiser en cas d'erreur
            setAnimatingCats({
                winner: null,
                loser: null,
                direction: null
            });
        }
    };

    const handleNewTournament = async () => {
        try {
            setShowConfetti(false);
            setAnimatingCats({
                winner: null,
                loser: null,
                direction: null
            });
            await startNewTournament();
        } catch (error) {
            console.error('Error starting new tournament:', error);
        }
    };

    // Tournoi terminé - écran de victoire
    if (lastVoteResult?.isComplete) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                {/* Confetti de victoire finale */}
                {showConfetti && (
                    <Confetti
                        width={window.innerWidth}
                        height={window.innerHeight}
                        numberOfPieces={200}
                        recycle={true}
                        colors={['#fbbf24', '#f59e0b', '#d97706', '#92400e']}
                    />
                )}

                <div className="text-center space-y-8 max-w-2xl mx-auto p-8">
                    {/* Animation de victoire */}
                    <motion.div
                        className="relative"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        <div className="text-8xl animate-bounce mb-4">🏆</div>
                        <div className="absolute inset-0 animate-ping">
                            <div className="text-8xl opacity-75">🏆</div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-yellow-600">
                            Tournoi Terminé !
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Tous les chats ont été affrontés !
                        </p>
                    </motion.div>

                    {/* Champion final */}
                    <motion.div
                        className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl p-8 border-2 border-yellow-400/50"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7, type: "spring" }}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-3 text-2xl font-bold text-yellow-700">
                                <Crown className="w-8 h-8"/>
                                Champion Final
                            </div>

                            {lastVoteResult.finalWinner && (
                                <div className="flex flex-col items-center space-y-4">
                                    <motion.img
                                        src={lastVoteResult.finalWinner.image}
                                        alt={`Champion ${lastVoteResult.finalWinner.id}`}
                                        className="w-32 h-32 object-cover rounded-full border-4 border-yellow-400 shadow-2xl"
                                        initial={{ scale: 0, rotate: -360 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 1, type: "spring", stiffness: 100 }}
                                    />
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold">Chat #{lastVoteResult.finalWinner.id}</h3>
                                        <p className="text-lg text-muted-foreground">
                                            {lastVoteResult.finalWinner.votes} victoires au total
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Stats de la session */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="bg-card border border-border rounded-xl p-4 text-center">
                            <Target className="w-8 h-8 text-blue-500 mx-auto mb-2"/>
                            <div className="text-2xl font-bold">{lastVoteResult.totalRounds}</div>
                            <div className="text-sm text-muted-foreground">Rounds totaux</div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-4 text-center">
                            <Timer className="w-8 h-8 text-green-500 mx-auto mb-2"/>
                            <div className="text-2xl font-bold">{lastVoteResult.sessionDuration}min</div>
                            <div className="text-sm text-muted-foreground">Durée totale</div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-4 text-center">
                            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2"/>
                            <div className="text-2xl font-bold">{lastVoteResult.streak}</div>
                            <div className="text-sm text-muted-foreground">Streak final</div>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <Button
                            onClick={handleNewTournament}
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                        >
                            {loading ? 'Préparation...' : '🚀 Nouveau Tournoi'}
                        </Button>

                        <p className="text-sm text-muted-foreground">
                            Félicitations ! Vous avez terminé un tournoi complet avec tous les chats ! 🎉
                        </p>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Loading initial
    if (loading && !currentPair) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                    <p className="text-xl font-semibold text-muted-foreground">Préparation du tournoi...</p>
                </div>
            </div>
        );
    }

    // Erreur
    if (error && !currentPair) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-lg text-destructive">Erreur lors du chargement du tournoi</p>
                    <Button
                        onClick={handleNewTournament}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Recommencer
                    </Button>
                </div>
            </div>
        );
    }

    // Pas de paire active
    if (!currentPair) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center space-y-6">
                    <Crown className="w-16 h-16 text-yellow-500 mx-auto animate-pulse"/>
                    <h1 className="text-3xl font-bold">Prêt pour un nouveau tournoi ?</h1>
                    <p className="text-muted-foreground">Affrontez tous les chats dans un tournoi complet !</p>
                    <Button
                        onClick={handleNewTournament}
                        disabled={loading}
                        className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                    >
                        {loading ? 'Préparation...' : 'Démarrer le tournoi 🚀'}
                    </Button>
                </div>
            </div>
        );
    }

    const {champion, challenger} = currentPair;
    const votingInProgress = isVotingForCat(champion.id) || isVotingForCat(challenger.id);

    return (
        <div className="space-y-8">
            {/* Confetti pour nouvelle victoire */}
            {showConfetti && !lastVoteResult?.isComplete && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={100}
                    recycle={false}
                    gravity={0.3}
                    colors={['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#dc2626', '#ef4444']}
                />
            )}

            {/* Header avec stats du tournoi */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Crown className="text-yellow-500 animate-pulse"/>
                    Tournoi CatMash
                    <Crown className="text-yellow-500 animate-pulse"/>
                </h1>

                {/* Actions */}
                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={handleNewTournament}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors text-sm"
                        disabled={loading || votingInProgress}
                    >
                        <RotateCcw className="w-4 h-4"/>
                        Nouveau tournoi
                    </Button>
                </div>
            </div>

            {/* Battle Arena */}
            <div className="relative">
                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-black text-2xl md:text-3xl px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl animate-pulse border-4 border-white">
                        VS
                    </div>
                </div>

                {/* Cats Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Champion (gauche) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`champion-${champion.id}`}
                            className={`group cursor-pointer transition-all duration-700 ${
                                isVotingForCat(champion.id) ? 'scale-105 z-30' : 'hover:scale-102'
                            } ${votingInProgress && !isVotingForCat(champion.id) ? 'opacity-70' : ''}`}
                            onClick={() => handleVote(champion.id)}
                            initial={{
                                x: animatingCats.loser === champion.id ? 0 : -100,
                                opacity: animatingCats.loser === champion.id ? 1 : 0,
                                scale: 0.8
                            }}
                            animate={{
                                x: animatingCats.loser === champion.id && animatingCats.direction === 'left' ? -300 : 0,
                                opacity: animatingCats.loser === champion.id && animatingCats.direction === 'left' ? 0 : 1,
                                scale: animatingCats.winner === champion.id ? 1.1 : 1,
                                rotate: animatingCats.loser === champion.id && animatingCats.direction === 'left' ? -15 : 0
                            }}
                            exit={{
                                x: -300,
                                opacity: 0,
                                rotate: -15,
                                transition: { duration: 0.5 }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                duration: 0.6
                            }}
                        >
                            {/* Glow effect pour le champion */}
                            <div
                                className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-3xl blur-xl"></div>

                            {/* Cat Card */}
                            <div
                                className="relative bg-card border-2 border-yellow-400/30 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                {/* Champion Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <div
                                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                        <Crown className="w-4 h-4"/>
                                        Champion
                                    </div>
                                </div>

                                {/* Cat Image */}
                                <div className="relative h-80 md:h-96 overflow-hidden">
                                    <img
                                        src={champion.image}
                                        alt={`Champion ${champion.id}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                                            <Heart className="text-white w-12 h-12 animate-bounce"/>
                                        </div>
                                    </div>

                                    {/* Victory Animation */}
                                    {isVotingForCat(champion.id) && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 animate-pulse flex items-center justify-center"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <div className="text-white text-6xl font-bold animate-bounce">👑</div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Cat Stats */}
                                <div className="p-6 bg-card space-y-4">
                                    {/* Vote Button */}
                                    <Button
                                        disabled={votingInProgress}
                                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            isVotingForCat(champion.id)
                                                ? 'bg-green-500 text-white'
                                                : votingInProgress
                                                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg hover:shadow-xl active:scale-95'
                                        }`}
                                    >
                                        {isVotingForCat(champion.id) ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Crown className="w-5 h-5 animate-pulse"/>
                                                Reste champion ! 👑
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <Crown className="w-5 h-5"/>
                                                Garder le champion
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Challenger (droite) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`challenger-${challenger.id}`}
                            className={`group cursor-pointer transition-all duration-700 ${
                                isVotingForCat(challenger.id) ? 'scale-105 z-30' : 'hover:scale-102'
                            } ${votingInProgress && !isVotingForCat(challenger.id) ? 'opacity-70' : ''}`}
                            onClick={() => handleVote(challenger.id)}
                            initial={{
                                x: animatingCats.loser === challenger.id ? 0 : 100,
                                opacity: animatingCats.loser === challenger.id ? 1 : 0,
                                scale: 0.8
                            }}
                            animate={{
                                x: animatingCats.loser === challenger.id && animatingCats.direction === 'right' ? 300 : 0,
                                opacity: animatingCats.loser === challenger.id && animatingCats.direction === 'right' ? 0 : 1,
                                scale: animatingCats.winner === challenger.id ? 1.1 : 1,
                                rotate: animatingCats.loser === challenger.id && animatingCats.direction === 'right' ? 15 : 0
                            }}
                            exit={{
                                x: 300,
                                opacity: 0,
                                rotate: 15,
                                transition: { duration: 0.5 }
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                duration: 0.6
                            }}
                        >
                            {/* Cat Card */}
                            <div
                                className="relative bg-card border-2 border-purple-400/30 rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                                {/* Challenger Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
                                        <Target className="w-4 h-4"/>
                                        Challenger
                                    </div>
                                </div>

                                {/* Cat Image */}
                                <div className="relative h-80 md:h-96 overflow-hidden">
                                    <img
                                        src={challenger.image}
                                        alt={`Challenger ${challenger.id}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                                            <Heart className="text-white w-12 h-12 animate-bounce"/>
                                        </div>
                                    </div>

                                    {/* Victory Animation */}
                                    {isVotingForCat(challenger.id) && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 animate-pulse flex items-center justify-center"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <div className="text-white text-6xl font-bold animate-bounce">🔥</div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Cat Stats */}
                                <div className="p-6 bg-card space-y-4">
                                    {/* Vote Button */}
                                    <Button
                                        disabled={votingInProgress}
                                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                                            isVotingForCat(challenger.id)
                                                ? 'bg-green-500 text-white'
                                                : votingInProgress
                                                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl active:scale-95'
                                        }`}
                                    >
                                        {isVotingForCat(challenger.id) ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Flame className="w-5 h-5 animate-pulse"/>
                                                Nouveau champion ! 🔥
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <Flame className="w-5 h-5"/>
                                                Défier le champion
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Loading overlay pour changement de paire */}
            {loading && currentPair && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-2xl">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
                        <p className="text-card-foreground text-lg font-semibold">Nouveau challenger en approche...</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}