import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Cat} from './entities/cat.entity';
import {createCatDto} from './schemas/cat.schema';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private readonly catsRepository: Repository<Cat>,
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

        return this.catsRepository.findOne({where: {id}});
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
}