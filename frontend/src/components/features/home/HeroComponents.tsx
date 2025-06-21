import {motion} from 'framer-motion';
import {Crown, Trophy, ArrowRight, Sparkles} from 'lucide-react';
import {ANIMATION_VARIANTS} from '@/constants';
import type {Cat} from '@/types/cat.types';

export const HeroBadge: React.FC = () => (
    <motion.div
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-4 py-2 mb-6"
        variants={ANIMATION_VARIANTS.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{delay: 0.2}}
        whileHover={{scale: 1.05}}
    >
        <Sparkles className="w-4 h-4 text-purple-500"/>
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
            Le tournoi de chats le plus mignon du web !
        </span>
    </motion.div>
);

export const HeroTitle: React.FC = () => (
    <motion.h1
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        variants={ANIMATION_VARIANTS.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{delay: 0.3}}
    >
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
            CatMash
        </span>
        <br/>
        <span className="text-foreground text-4xl md:text-5xl">
            Tournoi Ultimate
        </span>
    </motion.h1>
);

export const HeroDescription: React.FC = () => (
    <motion.p
        className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
        variants={ANIMATION_VARIANTS.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{delay: 0.4}}
    >
        Affrontez tous les chats dans des duels épiques ! Votez pour vos favoris,
        découvrez les champions et participez au classement mondial.
        <br/>
        <span className="font-semibold text-lg text-purple-600 dark:text-purple-400">
            Qui sera le chat ultime ? 🐱
        </span>
    </motion.p>
);

interface HeroButtonsProps {
    onStartTournament: () => void;
    onViewRanking: () => void;
}

export const HeroButtons: React.FC<HeroButtonsProps> = ({onStartTournament, onViewRanking}) => (
    <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        variants={ANIMATION_VARIANTS.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{delay: 0.5}}
    >
        <motion.button
            onClick={onStartTournament}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
        >
            <div
                className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            <div className="relative flex items-center justify-center gap-3">
                <Crown className="w-6 h-6"/>
                Commencer le tournoi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
            </div>
        </motion.button>

        <motion.button
            onClick={onViewRanking}
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
);

interface HeroImagesProps {
    heroImages: Cat[];
    heroImageIndex: number;
}

export const HeroImages: React.FC<HeroImagesProps> = ({heroImages, heroImageIndex}) => (
    <motion.div
        className="relative z-10"
        variants={ANIMATION_VARIANTS.slideInRight}
        initial="initial"
        animate="animate"
        transition={{duration: 0.8, delay: 0.2}}
    >
        {heroImages.length > 0 && (
            <div className="relative w-full max-w-sm mx-auto">
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
                        <div
                            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10"/>
                    </div>
                </motion.div>
            </div>
        )}
    </motion.div>
);