import {motion} from 'framer-motion';
import {StatsGrid} from '@/components/shared';
import {ANIMATION_VARIANTS} from '@/constants';
import {createStatsConfig} from '@/utils/statsConfigs';
import type {CatStats} from '@/types/cat.types';
import type {JSX} from "react";

export const StatsSection: ({stats}: { stats: CatStats }) => JSX.Element = ({stats}: { stats: CatStats }) => {
    const statsData = createStatsConfig(stats);

    return (
        <section>
            <div className="text-center mb-12">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{once: true}}
                >
                    CatMash en Chiffres
                </motion.h2>
                <motion.p
                    className="text-lg text-muted-foreground"
                    variants={ANIMATION_VARIANTS.fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    transition={{delay: 0.1}}
                    viewport={{once: true}}
                >
                    Rejoignez une communauté passionnée de chats !
                </motion.p>
            </div>

            <StatsGrid
                stats={statsData}
                columns={{default: 1, md: 3}}
                maxWidth="max-w-6xl"
            />
        </section>
    );
};