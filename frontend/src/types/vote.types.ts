import type {Cat} from './cat.types';
import type {User} from "@/types/auth.types.ts";

export interface Vote {
    id: string;
    userId: string;
    catId: string;
    user: User;
    cat: Cat;
    created_at: string;
}

export interface UserVotesHistory {
    votes: Vote[];
    totalVotes: number;
    favoriteCats: Cat[];
    totalTournaments: number;
    bestStreak: number;
    stats: [];
}