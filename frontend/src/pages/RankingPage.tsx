import {useEffect, useState, useCallback, useMemo} from 'react';
import {useCat} from '@/hooks/useCat';
import {LoadingScreen, ErrorScreen, SectionContainer} from '@/components/shared';
import {RankingHeader, PodiumSection, FilterSection, RankingGrid} from '@/components/features/ranking';
import {LAYOUT_CONSTANTS} from '@/constants';
import {formatters} from '@/utils';
import type {Cat, CatStats} from '@/types/cat.types';
import type {FilterOption} from '@/types/shared.types';

interface ExtendedCatStats extends CatStats {
    average: number;
}

export default function RankingPage() {
    const {cats, loading, error, fetchRanking, fetchStats, stats} = useCat();
    const [filterOption, setFilterOption] = useState<FilterOption>('all');

    const topThreeCats = useMemo(() => cats.slice(0, LAYOUT_CONSTANTS.PODIUM_SIZE), [cats]);

    const filteredCats = useMemo(() => {
        return cats.filter((cat: Cat) => {
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
    }, [cats, filterOption]);

    const statsWithAverage = useMemo((): ExtendedCatStats | null => {
        if (!stats) return null;
        return {
            ...stats,
            average: formatters.average(stats.totalVotes, stats.totalCats)
        };
    }, [stats]);

    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterOption(e.target.value as FilterOption);
    }, []);

    const handleRetry = useCallback(() => {
        fetchRanking();
    }, [fetchRanking]);

    useEffect(() => {
        (async () => {
            try {
                await Promise.all([fetchRanking(), fetchStats()]);
            } catch (error) {
                console.error('Error loading ranking data:', error);
            }
        })()
    }, [fetchRanking, fetchStats]);

    if (loading && cats.length === 0) {
        return <LoadingScreen message="Chargement du classement..."/>;
    }

    if (error && cats.length === 0) {
        return <ErrorScreen onRetry={handleRetry} message="Erreur lors du chargement du classement"/>;
    }

    return (
        <div className="space-y-8 pb-8">
            <SectionContainer>
                <RankingHeader stats={statsWithAverage}/>
            </SectionContainer>

            {topThreeCats.length >= LAYOUT_CONSTANTS.PODIUM_SIZE && (
                <SectionContainer maxWidth="md">
                    <PodiumSection topCats={topThreeCats}/>
                </SectionContainer>
            )}

            <FilterSection
                filterOption={filterOption}
                onFilterChange={handleFilterChange}
            />

            <RankingGrid
                filteredCats={filteredCats}
                allCats={cats}
            />
        </div>
    );
}