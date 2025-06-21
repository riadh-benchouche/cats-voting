import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';
import { PodiumCard } from '@/components/shared/PodiumCard.tsx';
import { ANIMATION_VARIANTS } from '@/constants';
import type { Cat } from '@/types/cat.types';

interface PodiumSectionProps {
    topCats: Cat[];
}

export const PodiumSection: React.FC<PodiumSectionProps> = ({ topCats }) => (
    <motion.div
        className="max-w-4xl mx-auto"
        variants={ANIMATION_VARIANTS.slideInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5, duration: 0.7 }}
    >
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Crown className="text-yellow-500" />
            Podium des Champions
        </h2>

        <div className="grid md:grid-cols-3 gap-6 items-end">
            <PodiumCard cat={topCats[1]} position={2} delay={0.8} />
            <PodiumCard cat={topCats[0]} position={1} delay={0.7} />
            <PodiumCard cat={topCats[2]} position={3} delay={0.9} />
        </div>
    </motion.div>
);