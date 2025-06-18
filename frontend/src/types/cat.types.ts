export interface Cat {
    id: string;
    image: string;
    votes: number;
    created_at: string;
    updated_at: string;
}

export interface CatStats {
    totalCats: number;
    totalVotes: number;
    topCats: Cat[];
    recentVotes: number;
}

