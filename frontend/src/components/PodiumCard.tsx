import {motion} from 'framer-motion';
import {Crown, Medal, Trophy} from 'lucide-react';
import type {Cat} from "@/types/cat.types.ts";

interface PodiumCardProps {
    cat: Cat;
    position: number;
    delay: number;
}

export function PodiumCard({cat, position, delay}: PodiumCardProps) {
    const getPositionConfig = (pos: number) => {
        switch (pos) {
            case 1:
                return {
                    gradient: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
                    border: 'border-yellow-500/50',
                    textColor: 'text-yellow-600',
                    bgColor: 'bg-yellow-500',
                    icon: Crown,
                    iconColor: 'text-yellow-500',
                    size: 'w-32 h-32',
                    height: 'h-16',
                    showCrown: true
                };
            case 2:
                return {
                    gradient: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900',
                    border: 'border-purple-400/50',
                    textColor: 'text-purple-600',
                    bgColor: 'bg-purple-400',
                    icon: Medal,
                    iconColor: 'text-purple-400',
                    size: 'w-24 h-24',
                    height: 'h-10',
                    showCrown: false
                };
            case 3:
                return {
                    gradient: 'from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30',
                    border: 'border-amber-600/50',
                    textColor: 'text-amber-700',
                    bgColor: 'bg-amber-600',
                    icon: Trophy,
                    iconColor: 'text-amber-600',
                    size: 'w-24 h-24',
                    height: 'h-6',
                    showCrown: false
                };
            default:
                return {
                    gradient: 'from-gray-100 to-gray-200',
                    border: 'border-gray-400/50',
                    textColor: 'text-gray-600',
                    bgColor: 'bg-gray-400',
                    icon: Trophy,
                    iconColor: 'text-gray-400',
                    size: 'w-24 h-24',
                    height: 'h-6',
                    showCrown: false
                };
        }
    };

    const config = getPositionConfig(position);
    const Icon = config.icon;

    return (
        <motion.div
            className={`order-${position}`}
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{delay, duration: 0.6}}
        >
            <div
                className={`bg-gradient-to-br ${config.gradient} rounded-t-3xl p-6 text-center border-4 ${config.border} relative`}>
                {config.showCrown && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <Crown className="w-12 h-12 text-yellow-500 animate-bounce"/>
                    </div>
                )}

                <div className={`relative mb-4 ${config.showCrown ? 'pt-4' : ''}`}>
                    <img
                        src={cat.image}
                        alt={`Chat #${cat.id}`}
                        className={`${config.size} object-cover rounded-full mx-auto border-4 border-${position === 1 ? 'yellow' : position === 2 ? 'purple' : 'amber'}-${position === 1 ? '500' : position === 2 ? '400' : '600'} shadow-${position === 1 ? '2xl' : 'lg'}`}
                    />
                    <div
                        className={`absolute -top-2 -right-2 ${config.bgColor} text-white ${position === 1 ? 'w-10 h-10' : 'w-8 h-8'} rounded-full flex items-center justify-center font-bold ${position === 1 ? 'text-xl' : 'text-lg'}`}>
                        {position}
                    </div>
                </div>

                <p className={`${position === 1 ? 'text-3xl' : 'text-2xl'} font-bold ${config.textColor}`}>
                    {cat.votes} votes
                </p>

                {!config.showCrown && (
                    <Icon className={`w-8 h-8 ${config.iconColor} mx-auto mt-2`}/>
                )}
            </div>
            <div className={`${config.bgColor} ${config.height} rounded-b-lg`}></div>
        </motion.div>
    );
}