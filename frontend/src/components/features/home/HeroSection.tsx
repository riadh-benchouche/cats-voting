import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '@/constants';
import { HeroBadge, HeroTitle, HeroDescription, HeroButtons, HeroImages } from './HeroComponents';
import type { Cat } from '@/types/cat.types';

interface HeroSectionProps {
    heroImages: Cat[];
    heroImageIndex: number;
    onStartTournament: () => void;
    onViewRanking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
                                                            heroImages,
                                                            heroImageIndex,
                                                            onStartTournament,
                                                            onViewRanking
                                                        }) => (
    <section className="relative flex items-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-4 pb-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    className="text-center lg:text-left z-10"
                    variants={ANIMATION_VARIANTS.slideInLeft}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.8 }}
                >
                    <HeroBadge />
                    <HeroTitle />
                    <HeroDescription />
                    <HeroButtons
                        onStartTournament={onStartTournament}
                        onViewRanking={onViewRanking}
                    />
                </motion.div>

                <HeroImages
                    heroImages={heroImages}
                    heroImageIndex={heroImageIndex}
                />
            </div>
        </div>
    </section>
);