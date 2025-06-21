import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Vote} from "./entities/vote.entity";
import {Repository} from "typeorm";
import {CatsService} from "../cats/cats.service";
import {Cat} from "../cats/entities/cat.entity";
import {TournamentSession} from "./entities/tournament-session.entity";

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Vote)
        private votesRepository: Repository<Vote>,
        @InjectRepository(TournamentSession)
        private tournamentSessionsRepository: Repository<TournamentSession>,
        private catsService: CatsService
    ) {
    }

    private async createVote(catId: string, userId: string): Promise<void> {
        const cat = await this.catsService.findOne(catId);
        const vote = this.votesRepository.create({
            cat: cat,
            user: {id: userId}
        });
        await this.votesRepository.save(vote);
        await this.catsService.incrementVotes(catId);
    }

    async startNewTournamentSession(userId: string): Promise<TournamentSession> {
        await this.tournamentSessionsRepository.update(
            {userId, isActive: true},
            {isActive: false, endedAt: new Date()}
        );

        const randomPair = await this.catsService.getRandomPair();

        const session = this.tournamentSessionsRepository.create({
            userId,
            currentChampionId: randomPair[0].id,
            challengerId: randomPair[1].id,
            round: 1,
            isActive: true,
            startedAt: new Date(),
            lastVoteAt: new Date()
        });

        return await this.tournamentSessionsRepository.save(session);
    }

    async getCurrentTournamentPair(userId: string): Promise<{
        champion: Cat;
        challenger: Cat;
        round: number;
        sessionId: string;
        isComplete?: boolean;
        totalCats?: number;
        remainingCats?: number;
    } | null> {
        const session = await this.tournamentSessionsRepository.findOne({
            where: {userId, isActive: true},
            relations: ['currentChampion', 'challenger']
        });

        if (!session) {
            const newSession = await this.startNewTournamentSession(userId);
            const sessionWithRelations = await this.tournamentSessionsRepository.findOne({
                where: {id: newSession.id},
                relations: ['currentChampion', 'challenger']
            });

            const totalCats = await this.catsService.getTotalCount();

            return {
                champion: sessionWithRelations!.currentChampion,
                challenger: sessionWithRelations!.challenger,
                round: sessionWithRelations!.round,
                sessionId: sessionWithRelations!.id,
                totalCats,
                remainingCats: totalCats - 2
            };
        }

        const totalCats = await this.catsService.getTotalCount();
        const remainingCats = Math.max(0, totalCats - session.round - 1);

        return {
            champion: session.currentChampion,
            challenger: session.challenger,
            round: session.round,
            sessionId: session.id,
            totalCats,
            remainingCats
        };
    }

    async voteInTournament(winnerCatId: string, userId: string): Promise<{
        winner: Cat;
        loser: Cat;
        nextChallenger?: Cat;
        round: number;
        isNewChampion: boolean;
        streak: number;
        isComplete: boolean;
        finalWinner?: Cat;
        totalRounds?: number;
        sessionDuration?: number;
    }> {
        const session = await this.tournamentSessionsRepository.findOne({
            where: {userId, isActive: true},
            relations: ['currentChampion', 'challenger']
        });

        if (!session) {
            throw new Error('No active tournament session found. Please start a new tournament.');
        }

        const winner = winnerCatId === session.currentChampionId ? session.currentChampion : session.challenger;
        const loser = winnerCatId === session.currentChampionId ? session.challenger : session.currentChampion;
        const isNewChampion = winnerCatId !== session.currentChampionId;

        await this.createVote(winnerCatId, userId);

        const totalCats = await this.catsService.getTotalCount();
        const catsUsedInTournament = session.round + 1;

        if (catsUsedInTournament >= totalCats) {
            // Terminer la session
            const sessionDuration = Math.floor((Date.now() - session.startedAt.getTime()) / (1000 * 60));

            await this.tournamentSessionsRepository.update(
                {id: session.id},
                {
                    isActive: false,
                    endedAt: new Date(),
                    round: session.round + 1
                }
            );

            return {
                winner,
                loser,
                round: session.round + 1,
                isNewChampion,
                streak: session.round,
                isComplete: true,
                finalWinner: winner,
                totalRounds: session.round + 1,
                sessionDuration
            };
        }

        const usedCatIds = await this.getUsedCatsInSession(session.id);
        usedCatIds.push(winner.id, loser.id);

        const nextChallenger = await this.catsService.getRandomCatExcluding(usedCatIds);

        session.currentChampionId = winner.id;
        session.currentChampion = winner;
        session.challengerId = nextChallenger.id;
        session.challenger = nextChallenger;
        session.round += 1;
        session.lastVoteAt = new Date();

        const updatedSession = await this.tournamentSessionsRepository.save(session);

        return {
            winner,
            loser,
            nextChallenger,
            round: updatedSession.round,
            isNewChampion,
            streak: this.calculateCurrentStreak(session),
            isComplete: false
        };
    }

    private async getUsedCatsInSession(sessionId: string): Promise<string[]> {
        const session = await this.tournamentSessionsRepository.findOne({
            where: {id: sessionId}
        });

        if (!session) return [];

        const votesInSession = await this.votesRepository
            .createQueryBuilder('vote')
            .leftJoinAndSelect('vote.cat', 'cat')
            .leftJoinAndSelect('vote.user', 'user')
            .where('user.id = :userId', {userId: session.userId})
            .andWhere('vote.created_at >= :startedAt', {startedAt: session.startedAt})
            .getMany();

        return votesInSession.map(vote => vote.cat.id);
    }

    private calculateCurrentStreak(session: TournamentSession): number {
        return session.round;
    }

    async getTournamentStats(userId: string): Promise<{
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
    }> {
        const activeSession = await this.tournamentSessionsRepository.findOne({
            where: {userId, isActive: true},
            relations: ['currentChampion']
        });

        const allSessions = await this.tournamentSessionsRepository.find({
            where: {userId},
            relations: ['currentChampion'],
            order: {createdAt: 'DESC'},
            take: 10
        });

        if (!activeSession) {
            return {
                currentChampion: null,
                round: 0,
                totalVotes: 0,
                sessionDuration: 0,
                isActive: false,
                streak: 0,
                sessionsHistory: allSessions
            };
        }

        const sessionDuration = Math.floor((Date.now() - activeSession.startedAt.getTime()) / (1000 * 60));
        const streak = activeSession.round - 1;
        const totalCats = await this.catsService.getTotalCount();
        const remainingCats = Math.max(0, totalCats - activeSession.round - 1);
        const progress = Math.round((activeSession.round / totalCats) * 100);

        return {
            currentChampion: activeSession.currentChampion,
            round: activeSession.round,
            totalVotes: activeSession.round - 1,
            sessionDuration,
            isActive: activeSession.isActive,
            streak,
            sessionsHistory: allSessions,
            totalCats,
            remainingCats,
            progress
        };
    }

    async endTournamentSession(userId: string): Promise<{
        finalChampion: Cat | null;
        totalRounds: number;
        sessionDuration: number;
    }> {
        const session = await this.tournamentSessionsRepository.findOne({
            where: {userId, isActive: true},
            relations: ['currentChampion']
        });

        if (!session) {
            throw new Error('No active tournament session to end');
        }

        const sessionDuration = Math.floor((Date.now() - session.startedAt.getTime()) / (1000 * 60));

        await this.tournamentSessionsRepository.update(
            {id: session.id},
            {isActive: false, endedAt: new Date()}
        );

        return {
            finalChampion: session.currentChampion,
            totalRounds: session.round,
            sessionDuration
        };
    }

    async getUserVotes(userId: string): Promise<{
        votes: Vote[];
        totalVotes: number;
        favoriteCats: Cat[];
        totalTournaments: number;
        bestStreak: number;
    }> {
        const userVotes = await this.votesRepository.find({
            where: {user: {id: userId}},
            relations: ['cat'],
            order: {created_at: 'DESC'}
        });

        const votedCatIds = userVotes.map(vote => vote.cat.id);
        let favoriteCats = [];

        if (votedCatIds.length > 0) {
            favoriteCats = await this.catsService.findByIds(votedCatIds);
            favoriteCats.sort((a, b) => b.votes - a.votes);
            favoriteCats = favoriteCats.slice(0, 3);
        }

        const allSessions = await this.tournamentSessionsRepository.find({
            where: {userId}
        });

        const bestStreak = allSessions.length > 0
            ? Math.max(...allSessions.map(s => s.round - 1))
            : 0;

        return {
            votes: userVotes,
            totalVotes: userVotes.length,
            favoriteCats,
            totalTournaments: allSessions.length,
            bestStreak
        };
    }
}