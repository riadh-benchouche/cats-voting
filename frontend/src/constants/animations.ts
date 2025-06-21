export const ANIMATION_DURATIONS = {
    CONFETTI_TIMEOUT: 3000,
    ANIMATION_RESET_TIMEOUT: 800,
    HERO_IMAGE_ROTATION_INTERVAL: 4000,
} as const;

export const ANIMATION_VARIANTS = {
    fadeInUp: {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        whileInView: {opacity: 1, y: 0}
    },
    fadeIn: {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0}
    },
    slideInLeft: {
        initial: {opacity: 0, x: -50},
        animate: {opacity: 1, x: 0}
    },
    slideInRight: {
        initial: {opacity: 0, x: 50},
        animate: {opacity: 1, x: 0}
    },
    slideInUp: {
        initial: {opacity: 0, y: 50},
        animate: {opacity: 1, y: 0}
    },
    scaleIn: {
        initial: {opacity: 0, scale: 0.8},
        animate: {opacity: 1, scale: 1}
    },
    victoryCard: {
        initial: {scale: 0, rotate: -180},
        animate: {scale: 1, rotate: 0},
        transition: {type: "spring", stiffness: 100, damping: 15}
    }
} as const;

export const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 100,
    damping: 20
} as const;