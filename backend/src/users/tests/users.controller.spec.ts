import {Test, TestingModule} from '@nestjs/testing';
import {UsersController} from '../users.controller';
import {UsersService} from '../users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from '../entities/user.entity';
import {Role} from '../schemas/roles.enum';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        role: Role.USER,
    };

    const mockUsersService = {
        create: jest.fn().mockResolvedValue(mockUser),
        findAll: jest.fn().mockResolvedValue([mockUser]),
        findOne: jest.fn().mockResolvedValue(mockUser),
        update: jest.fn().mockResolvedValue(mockUser),
        updateAccount: jest.fn().mockResolvedValue(mockUser),
        updatePassword: jest.fn().mockResolvedValue({message: 'Password updated successfully'}),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: {},
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    describe('create', () => {
        it('should create a user', async () => {
            const dto = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'Password123!',
            };

            expect(await controller.create(dto)).toEqual(mockUser);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll', () => {
        it('should return array of users', async () => {
            expect(await controller.findAll()).toEqual([mockUser]);
            expect(service.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            expect(await controller.findOne('1')).toEqual(mockUser);
            expect(service.findOne).toHaveBeenCalledWith('1');
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            const dto = {name: 'Updated Name'};
            expect(await controller.update('1', dto)).toEqual(mockUser);
            expect(service.update).toHaveBeenCalledWith('1', dto);
        });
    });

    describe('updateAccount', () => {
        it('should update user account', async () => {
            const dto = {name: 'New Name'};
            expect(await controller.updateAccount(dto, mockUser as User)).toEqual(mockUser);
            expect(service.updateAccount).toHaveBeenCalledWith(mockUser, dto);
        });
    });

    describe('updatePassword', () => {
        it('should update password', async () => {
            const dto = {
                oldPassword: 'OldPass123!',
                newPassword: 'NewPass123!',
            };
            expect(await controller.updatePassword(dto, mockUser as User)).toEqual({
                message: 'Password updated successfully'
            });
            expect(service.updatePassword).toHaveBeenCalledWith(mockUser, dto);
        });
    });
});