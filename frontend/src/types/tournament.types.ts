import type {Cat} from './cat.types';

export interface TournamentPair {
    champion: Cat;
    challenger: Cat;
    round: number;
    sessionId: string;
    isComplete?: boolean;
    totalCats?: number;
    remainingCats?: number;
}

export interface TournamentVoteResult {
    winner: Cat;
    loser: Cat;
    nextChallenger: Cat;
    round: number;
    isNewChampion: boolean;
    streak: number;
    isComplete: boolean;
    finalWinner?: Cat;
    totalRounds?: number
    sessionDuration?: number;
}

export interface TournamentStats {
    currentChampion: Cat | null;
    round: number;
    totalVotes: number;
    sessionDuration: number;
    isActive: boolean;
    streak: number;
    sessionsHistory: TournamentSession[];
    totalCats?: number;
    remainingCats?: number;
    progress?: number;
}

export interface TournamentSession {
    id: string;
    userId: string;
    currentChampionId: string;
    challengerId: string;
    round: number;
    isActive: boolean;
    startedAt: string;
    lastVoteAt: string;
    endedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TournamentEndResult {
    finalChampion: Cat | null;
    totalRounds: number;
    sessionDuration: number;
}