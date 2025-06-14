import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Vote} from "./entities/vote.entity";
import {Repository} from "typeorm";
import {CatsService} from "../cats/cats.service";
import {Cat} from "../cats/entities/cat.entity";

@Injectable()
export class VotesService {
    constructor(
        @InjectRepository(Vote)
        private votesRepository: Repository<Vote>,
        private catsService: CatsService
    ) {
    }

    async voteForCat(catId: string, userId: string): Promise<void> {
        const cat = await this.catsService.findOne(catId);
        const vote = this.votesRepository.create(
            {
                cat: cat,
                user: {id: userId}
            });
        await this.votesRepository.save(vote);
        await this.catsService.incrementVotes(catId);
    }

    async hasVoted(catId: string, userId: string): Promise<boolean> {
        const vote = await this.votesRepository.findOne(
            {
                where: {
                    cat: {id: catId},
                    user: {id: userId}
                }
            });
        return vote !== null;
    }

    async getUserVotes(userId: string): Promise<{
        votes: Vote[];
        totalVotes: number;
        favoriteCats: Cat[];
        stats: {
            totalVoted: number;
            votingRate: number;
        }
    }> {
        // Récupérer tous les votes de l'utilisateur
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

        // Stats
        const totalCats = await this.catsService.getTotalCount();
        const totalVoted = userVotes.length;
        const votingRate = totalCats > 0 ? Math.round((totalVoted / totalCats) * 100) : 0;

        return {
            votes: userVotes,
            totalVotes: userVotes.length,
            favoriteCats,
            stats: {
                totalVoted,
                votingRate
            }
        };
    }
}
