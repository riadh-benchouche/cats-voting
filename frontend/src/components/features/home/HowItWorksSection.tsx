import { motion } from 'framer-motion';
import { HOW_IT_WORKS_STEPS, ANIMATION_VARIANTS } from '@/constants';

export const HowItWorksSection: React.FC = () => (
    <section>
        <div className="text-center mb-12">
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                Comment ça marche ?
            </motion.h2>
            <motion.p
                className="text-lg text-muted-foreground"
                variants={ANIMATION_VARIANTS.fadeInUp}
                initial="initial"
                whileInView="animate"
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
            >
                Participer au tournoi CatMash est simple comme bonjour !
            </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((item, index) => (
                <motion.div
                    key={item.step}
                    className="text-center p-6 bg-card rounded-2xl border border-border hover:border-purple-500/50 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                >
                    <motion.div
                        className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-2xl font-bold text-white">{item.step}</span>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    </section>
);