import { motion } from 'framer-motion';
import { StatsCard } from '@/components/shared/StatsCard.tsx';
import type { LucideIcon } from 'lucide-react';

interface StatConfig {
    icon: LucideIcon;
    value: string | number;
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    delay?: number;
}

interface StatsGridProps {
    stats: StatConfig[];
    columns?: {
        default?: number;
        md?: number;
        lg?: number;
    };
    maxWidth?: string;
    className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
                                                        stats,
                                                        columns = { default: 1, md: 3 },
                                                        maxWidth = "max-w-4xl",
                                                        className = ""
                                                    }) => {
    const getGridClasses = () => {
        const classes = ['grid gap-4', maxWidth, 'mx-auto'];

        if (columns.default) classes.push(`grid-cols-${columns.default}`);
        if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
        if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);

        return classes.join(' ');
    };

    return (
        <motion.div
            className={`${getGridClasses()} ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            {stats.map((stat) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: stat.delay || 0 }}
                    viewport={{ once: true }}
                >
                    <StatsCard
                        icon={stat.icon}
                        value={stat.value}
                        label={stat.label}
                        color={stat.color}
                        bgColor={stat.bgColor}
                        borderColor={stat.borderColor}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
};