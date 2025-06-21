import {ANIMATION_VARIANTS, SPRING_TRANSITION} from '@/constants';

export const animations = {
    variants: ANIMATION_VARIANTS,
    transitions: {
        spring: SPRING_TRANSITION,
        smooth: {duration: 0.6, ease: "easeOut"},
        fast: {duration: 0.3},
        slow: {duration: 1.0}
    },
} as const;