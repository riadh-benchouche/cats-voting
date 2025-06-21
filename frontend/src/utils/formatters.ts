export const formatters = {
    votes: (votes: number): string => votes.toLocaleString(),
    average: (total: number, count: number): number =>
        Math.round((total / count) * 10) / 10,
    duration: (minutes: number): string => `${minutes}min`,
} as const;