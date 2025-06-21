import {useEffect, useState, useCallback, useMemo} from 'react';
import {useCat} from '@/hooks/useCat';
import {SectionContainer} from '@/components/shared';
import {HeroSection, StatsSection, TopCatsSection, HowItWorksSection} from '@/components/features/home';
import {LAYOUT_CONSTANTS, ANIMATION_DURATIONS} from '@/constants';
import {useNavigate} from "react-router-dom";

export default function HomePage() {
    const {fetchStats, stats, fetchRanking, cats} = useCat();
    const navigate = useNavigate();
    const [heroImageIndex, setHeroImageIndex] = useState(0);

    const topCats = useMemo(() => cats.slice(0, LAYOUT_CONSTANTS.TOP_CATS_COUNT), [cats]);
    const heroImages = useMemo(() => cats.slice(0, LAYOUT_CONSTANTS.MAX_HERO_IMAGES), [cats]);

    const handleStartTournament = useCallback(() => {
        navigate('/vote');
    }, [navigate]);

    const handleViewRanking = useCallback(() => {
        navigate('/ranking');
    }, [navigate]);

    useEffect(() => {
        (async () => {
            try {
                await Promise.all([fetchStats(), fetchRanking()]);
            } catch (error) {
                console.error('Error loading homepage data:', error);
            }
        })();
    }, [fetchStats, fetchRanking]);

    useEffect(() => {
        if (heroImages.length <= 1) return;
        const interval = setInterval(() => {
            setHeroImageIndex(prev => (prev + 1) % heroImages.length);
        }, ANIMATION_DURATIONS.HERO_IMAGE_ROTATION_INTERVAL);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div className="relative space-y-16">
            <SectionContainer maxWidth="xl">
                <HeroSection
                    heroImages={heroImages}
                    heroImageIndex={heroImageIndex}
                    onStartTournament={handleStartTournament}
                    onViewRanking={handleViewRanking}
                />
            </SectionContainer>

            {stats && (
                <SectionContainer>
                    <StatsSection stats={stats}/>
                </SectionContainer>
            )}

            {topCats.length >= LAYOUT_CONSTANTS.TOP_CATS_COUNT && (
                <SectionContainer>
                    <TopCatsSection topCats={topCats} onViewRanking={handleViewRanking}/>
                </SectionContainer>
            )}

            <SectionContainer>
                <HowItWorksSection/>
            </SectionContainer>
        </div>
    );
}