import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { RankingCard } from '@/components/shared/RankingCard.tsx';
import { EmptyState } from '@/components/shared';
import type { Cat } from '@/types/cat.types';

interface RankingGridProps {
    filteredCats: Cat[];
    allCats: Cat[];
}

export const RankingGrid: React.FC<RankingGridProps> = ({ filteredCats, allCats }) => (
    <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
    >
        <h2 className="text-2xl font-bold mb-6 text-center">
            Classement Complet ({filteredCats.length} chats)
        </h2>

        <AnimatePresence mode="wait">
            {filteredCats.length > 0 ? (
                <CatsGrid cats={filteredCats} allCats={allCats} />
            ) : (
                <EmptyState
                    icon={Search}
                    title="Aucun chat trouvé"
                    description="Essayez de modifier vos critères de recherche ou de filtrage."
                />
            )}
        </AnimatePresence>
    </motion.div>
);

const CatsGrid: React.FC<{ cats: Cat[]; allCats: Cat[] }> = ({ cats, allCats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cats.map((cat: Cat, index: number) => {
            const rank = allCats.indexOf(cat) + 1;
            return (
                <RankingCard
                    key={cat.id}
                    cat={cat}
                    rank={rank}
                    topCatVotes={allCats[0]?.votes || 0}
                    index={index}
                />
            );
        })}
    </div>
);