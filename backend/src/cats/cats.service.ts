import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {In, Repository} from 'typeorm';
import {Cat} from './entities/cat.entity';
import {createCatDto} from './schemas/cat.schema';
import {Vote} from "../votes/entities/vote.entity";

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private readonly catsRepository: Repository<Cat>,
        @InjectRepository(Vote)
        private readonly votesRepository: Repository<Vote>,
    ) {
    }

    async create(createCatDto: createCatDto): Promise<Cat> {
        const cat = this.catsRepository.create(createCatDto);
        return this.catsRepository.save(cat);
    }

    async findAll(): Promise<Cat[]> {
        return this.catsRepository.find();
    }

    async findOne(id: string): Promise<Cat> {
        const cat = await this.catsRepository.findOne({where: {id}});
        if (!cat) {
            throw new NotFoundException(`Cat with id ${id} not found`);
        }

        return cat;
    }

    async findByImage(imageUrl: string): Promise<Cat | null> {
        return this.catsRepository.findOne({where: {image: imageUrl}});
    }

    async update(id: string, updateCatDto: createCatDto): Promise<Cat> {
        await this.catsRepository.update(id, updateCatDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.catsRepository.softDelete(id);
        return Promise.resolve();
    }

    async incrementVotes(catId: string): Promise<void> {
        await this.catsRepository.increment({id: catId}, 'votes', 1);
    }

    async getGlobalStats(): Promise<{
        totalCats: number;
        totalVotes: number;
        topCats: Cat[];
        recentVotes: number;
    }> {
        const totalCats = await this.catsRepository.count();
        const totalVotes = await this.votesRepository.count();

        const topCats = await this.catsRepository.find({
            order: {votes: 'DESC'},
            take: 3
        });

        const yesterday = new Date();
        yesterday.setHours(yesterday.getHours() - 24);

        const recentVotes = await this.votesRepository
            .createQueryBuilder('vote')
            .where('vote.created_at >= :yesterday', {yesterday})
            .getCount();

        return {
            totalCats,
            totalVotes,
            topCats,
            recentVotes
        };
    }

    async getFullRanking(): Promise<Cat[]> {
        return this.catsRepository.find({
            order: {votes: 'DESC'}
        });
    }

    async getRandomPair(): Promise<Cat[]> {
        const cats = await this.catsRepository.find();

        if (cats.length < 2) {
            throw new NotFoundException('Not enough cats available');
        }

        const shuffled = cats.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
    }

    async findByIds(votedCatIds: string[]) {
        const cats = await this.catsRepository.findBy({id: In([...votedCatIds])});
        if (cats.length === 0) {
            throw new NotFoundException('No cats found for the provided IDs');
        }
        return cats;
    }

    async getTotalCount() {
        const count = await this.catsRepository.count();
        if (count === 0) {
            throw new NotFoundException('No cats found');
        }
        return count;
    }

    async getRandomCatExcluding(excludeIds: string[]): Promise<Cat> {
        try {
            const response = await this.catsRepository
                .createQueryBuilder('cat')
                .where('cat.id NOT IN (:...excludeIds)', { excludeIds })
                .orderBy('RANDOM()')
                .take(1)
                .getOne();

            if (!response) {
                return await this.catsRepository
                    .createQueryBuilder('cat')
                    .orderBy('RANDOM()')
                    .take(1)
                    .getOne();
            }

            return response;
        } catch (error) {
            console.error('Error while fetching random cat excluding IDs:', error);
            throw error;
        }
    }
}