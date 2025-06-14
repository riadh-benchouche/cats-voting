import {Test, TestingModule} from '@nestjs/testing';
import {CatsController} from '../cats.controller';
import {CatsService} from '../cats.service';
import {createCatDto, updateCatDto} from '../schemas/cat.schema';
import {Cat} from '../entities/cat.entity';

describe('CatsController', () => {
    let controller: CatsController;
    let service: CatsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [
                {
                    provide: CatsService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CatsController>(CatsController);
        service = module.get<CatsService>(CatsService);
    });

    describe('create', () => {
        it('should create a new cat', async () => {
            const createDto: createCatDto = {image: 'cat.jpg'};
            const createdCat = {id: '1', ...createDto};

            jest.spyOn(service, 'create').mockResolvedValue(createdCat as Cat);

            expect(await controller.create(createDto)).toBe(createdCat);
        });
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const cats = [
                {id: '1', image: 'cat1.jpg', votes: 0, created_at: new Date(), updated_at: new Date()},
                {id: '2', image: 'cat2.jpg', votes: 0, created_at: new Date(), updated_at: new Date()},
            ];

            jest.spyOn(service, 'findAll').mockResolvedValue(cats as Cat[]);

            expect(await controller.findAll()).toBe(cats);
        });
    });

    describe('findOne', () => {
        it('should return a cat by id', async () => {
            const catId = '1';
            const cat = {id: catId, image: 'cat.jpg'};

            jest.spyOn(service, 'findOne').mockResolvedValue(cat as Cat);

            expect(await controller.findOne(catId)).toBe(cat);
        });
    });

    describe('update', () => {
        it('should update a cat', async () => {
            const catId = '1';
            const updateDto: updateCatDto = {image: 'updated-cat.jpg'};
            const updatedCat = {id: catId, ...updateDto};

            jest.spyOn(service, 'update').mockResolvedValue(updatedCat as Cat);

            expect(await controller.update(catId, updateDto)).toBe(updatedCat);
        });
    });

    describe('remove', () => {
        it('should remove a cat', async () => {
            const catId = '1';

            jest.spyOn(service, 'remove').mockResolvedValue();

            expect(await controller.remove(catId)).toBeUndefined();
            expect(service.remove).toHaveBeenCalledWith(catId);
        });
    });
});