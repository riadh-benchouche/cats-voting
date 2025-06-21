import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { ANIMATION_VARIANTS } from '@/constants';
import { GlobalStats } from './GlobalStats';
import type { CatStats } from '@/types/cat.types';

interface ExtendedCatStats extends CatStats {
    average: number;
}

interface RankingHeaderProps {
    stats: ExtendedCatStats | null;
}

export const RankingHeader: React.FC<RankingHeaderProps> = ({ stats }) => (
    <motion.div
        className="text-center space-y-6"
        variants={ANIMATION_VARIANTS.fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.6 }}
    >
        <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground flex items-center justify-center gap-4">
                <Trophy className="text-yellow-500 animate-pulse" />
                Classement CatMash
                <Trophy className="text-yellow-500 animate-pulse" />
            </h1>
            <p className="text-xl text-muted-foreground">
                Découvrez les chats les plus aimés de la communauté
            </p>
        </div>

        {stats && <GlobalStats stats={stats} />}
    </motion.div>
);