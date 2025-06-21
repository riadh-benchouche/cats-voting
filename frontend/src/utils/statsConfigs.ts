import {Target, Heart, Flame} from 'lucide-react';
import {formatters} from './formatters';
import type {CatStats} from '@/types/cat.types';

export const STATS_TEMPLATES = {
    totalCats: {
        icon: Target,
        label: "Chats Participants",
        color: "text-blue-600",
        bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
        borderColor: "border-blue-200/50",
        delay: 0.1
    },
    totalCatsRanking: {
        icon: Target,
        label: "Chats Total",
        color: "text-blue-600",
        bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/10",
        borderColor: "border-blue-500/20",
        delay: 0.1
    },
    totalVotes: {
        icon: Heart,
        label: "Votes Totaux",
        color: "text-green-600",
        bgColor: "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20",
        borderColor: "border-green-200/50",
        delay: 0.2
    },
    totalVotesRanking: {
        icon: Heart,
        label: "Votes Total",
        color: "text-green-600",
        bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/10",
        borderColor: "border-green-500/20",
        delay: 0.2
    },
    recentVotes: {
        icon: Flame,
        label: "Votes 24h",
        color: "text-orange-600",
        bgColor: "bg-gradient-to-br from-orange-500/10 to-orange-600/10",
        borderColor: "border-orange-500/20",
        delay: 0.3
    }
} as const;

export const createStatsConfig = (stats: CatStats) => [
    {
        ...STATS_TEMPLATES.totalCats,
        value: stats.totalCats
    },
    {
        ...STATS_TEMPLATES.totalVotes,
        value: formatters.votes(stats.totalVotes)
    },
    {
        ...STATS_TEMPLATES.recentVotes,
        value: stats.recentVotes
    },
];