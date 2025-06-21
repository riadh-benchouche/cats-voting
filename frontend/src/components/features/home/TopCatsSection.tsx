import {motion} from 'framer-motion';
import {Crown, ArrowRight} from 'lucide-react';
import {PodiumCard} from '@/components/shared/PodiumCard.tsx';
import {ANIMATION_VARIANTS} from '@/constants';
import type {Cat} from '@/types/cat.types';

interface TopCatsSectionProps {
    topCats: Cat[];
    onViewRanking: () => void;
}

export const TopCatsSection: React.FC<TopCatsSectionProps> = ({topCats, onViewRanking}) => (
    <section>
        <div className="text-center mb-12">
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{once: true}}
            >
                <Crown className="text-yellow-500"/>
                Champions Actuels
                <Crown className="text-yellow-500"/>
            </motion.h2>
            <motion.p
                className="text-lg text-muted-foreground"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{delay: 0.1}}
                viewport={{once: true}}
            >
                Les chats les plus aimés de la communauté
            </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-end justify-center">
            <div className="order-1 md:order-1">
                <PodiumCard cat={topCats[1]} position={2} delay={0.1}/>
            </div>
            <div className="order-2 md:order-2">
                <PodiumCard cat={topCats[0]} position={1} delay={0.2}/>
            </div>
            <div className="order-3 md:order-3">
                <PodiumCard cat={topCats[2]} position={3} delay={0.3}/>
            </div>
        </div>

        <motion.div
            className="text-center mt-12"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{delay: 0.5}}
            viewport={{once: true}}
        >
            <motion.button
                onClick={onViewRanking}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.95}}
            >
                Voir le classement complet
                <ArrowRight className="w-5 h-5"/>
            </motion.button>
        </motion.div>
    </section>
);