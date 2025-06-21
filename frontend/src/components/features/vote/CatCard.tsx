import React from 'react';
import {motion} from 'framer-motion';
import {Heart} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {TOURNAMENT_CONFIGS} from '@/constants';
import {animations} from '@/utils';
import type {Cat} from '@/types/cat.types';
import type {AnimatingCats} from '@/types/shared.types';

interface CatCardProps {
    cat: Cat;
    type: 'champion' | 'challenger';
    animatingCats: AnimatingCats;
    votingInProgress: boolean;
    onVote: (catId: string) => void;
    isVotingForCat: (catId: string) => boolean;
}

export const CatCard: React.FC<CatCardProps> = ({
                                                    cat,
                                                    type,
                                                    animatingCats,
                                                    votingInProgress,
                                                    onVote,
                                                    isVotingForCat
                                                }) => {
    const isChampion = type === 'champion';
    const isLoser = animatingCats.loser === cat.id;
    const isWinner = animatingCats.winner === cat.id;
    const isVoting = isVotingForCat(cat.id);

    const cardConfig = TOURNAMENT_CONFIGS[type.toUpperCase() as keyof typeof TOURNAMENT_CONFIGS];

    return (
        <motion.div
            key={`${type}-${cat.id}`}
            className={`group cursor-pointer transition-all duration-700 ${
                isVoting ? 'scale-105 z-30' : 'hover:scale-102'
            } ${votingInProgress && !isVoting ? 'opacity-70' : ''}`}
            onClick={() => onVote(cat.id)}
            initial={{
                x: isLoser ? 0 : (isChampion ? -100 : 100),
                opacity: isLoser ? 1 : 0,
                scale: 0.8
            }}
            animate={{
                x: isLoser && animatingCats.direction === (isChampion ? 'left' : 'right') ? (isChampion ? -300 : 300) : 0,
                opacity: isLoser && animatingCats.direction === (isChampion ? 'left' : 'right') ? 0 : 1,
                scale: isWinner ? 1.1 : 1,
                rotate: isLoser && animatingCats.direction === (isChampion ? 'left' : 'right') ? (isChampion ? -15 : 15) : 0
            }}
            exit={{
                x: isChampion ? -300 : 300,
                opacity: 0,
                rotate: isChampion ? -15 : 15,
                transition: {duration: 0.5}
            }}
            transition={animations.transitions.spring}
        >
            {isChampion && cardConfig.glowColor && (
                <div className={`absolute -inset-2 bg-gradient-to-r ${cardConfig.glowColor} rounded-3xl blur-xl`}/>
            )}

            <div
                className={`relative bg-card border-2 ${cardConfig.borderColor} rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                <div className={`absolute top-4 ${isChampion ? 'left-4' : 'right-4'} z-10`}>
                    <div
                        className={`bg-gradient-to-r ${cardConfig.badgeColor} text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2`}>
                        <cardConfig.icon className="w-4 h-4"/>
                        {cardConfig.label}
                    </div>
                </div>

                <div className="relative h-80 md:h-96 overflow-hidden">
                    <img
                        src={cat.image}
                        alt={`${cardConfig.label} ${cat.id}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                            <Heart className="text-white w-12 h-12 animate-bounce"/>
                        </div>
                    </div>

                    {isVoting && (
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-r ${cardConfig.victoryBg} animate-pulse flex items-center justify-center`}
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: "spring", stiffness: 200}}
                        >
                            <div className="text-white text-6xl font-bold animate-bounce">
                                {cardConfig.victoryEmoji}
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="p-6 bg-card space-y-4">
                    <Button
                        disabled={votingInProgress}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                            isVoting
                                ? 'bg-green-500 text-white'
                                : votingInProgress
                                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                    : `bg-gradient-to-r ${cardConfig.buttonColor} text-white shadow-lg hover:shadow-xl active:scale-95`
                        }`}
                    >
                        {isVoting ? (
                            <span className="flex items-center justify-center gap-2">
                                <cardConfig.icon className="w-5 h-5 animate-pulse"/>
                                {cardConfig.victoryText}
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <cardConfig.icon className="w-5 h-5"/>
                                {cardConfig.buttonText}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};