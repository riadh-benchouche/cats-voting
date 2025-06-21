import React from 'react';
import Confetti from 'react-confetti';

interface ConfettiWrapperProps {
    show: boolean;
    type?: 'victory' | 'celebration' | 'success';
    recycle?: boolean;
}

interface ConfettiConfig {
    numberOfPieces: number;
    colors: string[];
    recycle: boolean;
    gravity?: number;
}

const CONFETTI_CONFIGS: Record<string, ConfettiConfig> = {
    victory: {
        numberOfPieces: 200,
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#92400e'],
        recycle: true
    },
    celebration: {
        numberOfPieces: 100,
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#92400e', '#dc2626', '#ef4444'],
        recycle: false,
        gravity: 0.3
    },
    success: {
        numberOfPieces: 150,
        colors: ['#10b981', '#059669', '#047857', '#065f46'],
        recycle: false
    }
};

export const ConfettiWrapper: React.FC<ConfettiWrapperProps> = ({
                                                                    show,
                                                                    type = 'celebration',
                                                                    recycle
                                                                }) => {
    if (!show) return null;

    const config = CONFETTI_CONFIGS[type];

    const shouldRecycle = recycle !== undefined ? recycle : config.recycle;

    return (
        <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={config.numberOfPieces}
            recycle={shouldRecycle}
            gravity={config.gravity || 0.6}
            colors={config.colors}
        />
    );
};