export interface AnimatingCats {
    winner: string | null;
    loser: string | null;
    direction: 'left' | 'right' | null;
}

export type FilterOption = 'all' | 'top10' | 'rising';