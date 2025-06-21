import React from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
                                                                      children,
                                                                      className = '',
                                                                      delay = 0,
                                                                      maxWidth = 'lg'
                                                                  }) => {
    const maxWidthClasses = {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        '2xl': 'max-w-8xl',
        full: 'max-w-full'
    };

    return (
        <motion.div
            className={`${maxWidthClasses[maxWidth]} mx-auto px-4 ${className}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
};