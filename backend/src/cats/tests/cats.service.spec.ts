import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CatsService} from '../cats.service';
import {Cat} from '../entities/cat.entity';
import {createCatDto} from '../schemas/cat.schema';
import {NotFoundException} from '@nestjs/common';
import {describe} from "node:test";

describe('CatsService', () => {
    let service: CatsService;
    let repository: Repository<Cat>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CatsService,
                {
                    provide: getRepositoryToken(Cat),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        softDelete: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<CatsService>(CatsService);
        repository = module.get<Repository<Cat>>(getRepositoryToken(Cat));
    });

    describe('create', () => {
        it('should create a new cat', async () => {
            const createDto: createCatDto = {image: 'cat.jpg'};
            const createdCat = {id: '1', ...createDto};

            jest.spyOn(repository, 'create').mockReturnValue(createdCat as Cat);
            jest.spyOn(repository, 'save').mockResolvedValue(createdCat as Cat);

            expect(await service.create(createDto)).toBe(createdCat);
        });
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const cats = [
                {id: '1', image: 'cat1.jpg'},
                {id: '2', image: 'cat2.jpg'},
            ];

            jest.spyOn(repository, 'find').mockResolvedValue(cats as Cat[]);

            expect(await service.findAll()).toBe(cats);
        });
    });

    describe('findOne', () => {
        it('should return a cat by id', async () => {
            const catId = '1';
            const cat = {id: catId, image: 'cat.jpg'};

            jest.spyOn(repository, 'findOne').mockResolvedValue(cat as Cat);

            expect(await service.findOne(catId)).toBe(cat);
        });

        it('should throw NotFoundException if cat is not found', async () => {
            const catId = '1';

            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            await expect(service.findOne(catId)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

    describe('findByImage', () => {
        it('should return a cat by image URL', async () => {
            const imageUrl = 'cat.jpg';
            const cat = {id: '1', image: imageUrl};

            jest.spyOn(repository, 'findOne').mockResolvedValue(cat as Cat);

            expect(await service.findByImage(imageUrl)).toBe(cat);
        });

        it('should return null if cat is not found', async () => {
            const imageUrl = 'nonexistent.jpg';

            jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

            expect(await service.findByImage(imageUrl)).toBeUndefined();
        });
    });

    describe('update', () => {
        it('should update a cat', async () => {
            const catId = '1';
            const updateDto: createCatDto = {image: 'updated-cat.jpg'};
            const updatedCat = {id: catId, ...updateDto};

            jest.spyOn(repository, 'update').mockResolvedValue(undefined);
            jest.spyOn(service, 'findOne').mockResolvedValue(updatedCat as Cat);

            expect(await service.update(catId, updateDto)).toBe(updatedCat);
        });
    });

    describe('remove', () => {
        it('should remove a cat', async () => {
            const catId = '1';

            jest.spyOn(repository, 'softDelete').mockResolvedValue(undefined);

            await expect(service.remove(catId)).resolves.toBeUndefined();
            expect(repository.softDelete).toHaveBeenCalledWith(catId);
        });
    });

    describe('incrementVotes', () => {
        it('should increment votes of a cat', async () => {
            const catId = '1';

            await expect(service.incrementVotes(catId)).resolves.toBeUndefined();
            expect(repository.increment).toHaveBeenCalledWith(
                {id: catId},
                'votes',
                1,
            );
        });
    });
});