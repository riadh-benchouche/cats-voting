import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
                                                          icon: Icon,
                                                          title,
                                                          description,
                                                          action
                                                      }) => (
    <motion.div
        className="text-center py-12 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Icon className="w-16 h-16 text-muted-foreground mx-auto" />
        <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">{description}</p>
        </div>
        {action && <div className="pt-4">{action}</div>}
    </motion.div>
);