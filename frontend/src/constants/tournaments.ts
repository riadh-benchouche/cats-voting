import {CrownIcon, SwordsIcon} from "lucide-react";

export const TOURNAMENT_CONFIGS = {
    CHAMPION: {
        borderColor: 'border-yellow-400/30',
        glowColor: 'from-yellow-400/20 to-orange-500/20',
        badgeColor: 'from-yellow-400 to-orange-500',
        buttonColor: 'from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600',
        label: 'Champion',
        buttonText: 'Garder le champion',
        victoryText: 'Reste champion ! 👑',
        victoryEmoji: '👑',
        victoryBg: 'from-yellow-400/30 to-orange-500/30',
        icon: CrownIcon
    },
    CHALLENGER: {
        borderColor: 'border-purple-400/30',
        glowColor: '',
        badgeColor: 'from-purple-500 to-pink-500',
        buttonColor: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
        label: 'Challenger',
        buttonText: 'Défier le champion',
        victoryText: 'Nouveau champion ! 🔥',
        victoryEmoji: '🔥',
        victoryBg: 'from-purple-400/30 to-pink-400/30',
        icon: SwordsIcon
    }
} as const;

export const HOW_IT_WORKS_STEPS = [
    {
        step: 1,
        title: "Affrontez les chats",
        description: "Deux chats s'affrontent : un champion et un challenger. Choisissez votre favori en cliquant dessus !",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        step: 2,
        title: "Construisez votre streak",
        description: "Le gagnant devient le nouveau champion et affronte le prochain challenger. Créez la plus longue série de victoires !",
        gradient: "from-pink-500 to-orange-500"
    },
    {
        step: 3,
        title: "Découvrez le champion",
        description: "Quand tous les chats ont été affrontés, le champion final est couronné ! Consultez le classement pour voir les résultats.",
        gradient: "from-orange-500 to-yellow-500"
    }
] as const;