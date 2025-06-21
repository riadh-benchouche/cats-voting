import React from 'react';
import { StatsGrid } from '@/components/shared';
import { createStatsConfig } from '@/utils/statsConfigs';
import type { CatStats } from '@/types/cat.types';

interface ExtendedCatStats extends CatStats {
    average: number;
}

interface GlobalStatsProps {
    stats: ExtendedCatStats;
}

export const GlobalStats: React.FC<GlobalStatsProps> = ({ stats }) => {
    const statsData = createStatsConfig(stats);

    return (
        <StatsGrid
            stats={statsData}
            columns={{ default: 1, md: 3 }}
            maxWidth="max-w-4xl"
        />
    );
};