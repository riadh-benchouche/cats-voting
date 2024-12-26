import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {Role} from './schema/roles.enum';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<User>;

    const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        password: 'hashedPassword',
        role: Role.USER,
    };

    const mockRepository = {
        create: jest.fn().mockReturnValue(mockUser),
        save: jest.fn().mockResolvedValue(mockUser),
        find: jest.fn().mockResolvedValue([mockUser]),
        findOne: jest.fn().mockResolvedValue(mockUser),
        update: jest.fn().mockResolvedValue(true),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
    });

    describe('create', () => {
        it('should create a user', async () => {
            const dto = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'Password123!',
            };

            mockRepository.findOne.mockResolvedValueOnce(null);

            const result = await service.create(dto);
            expect(result).toEqual(mockUser);
            expect(repository.create).toHaveBeenCalled();
            expect(repository.save).toHaveBeenCalled();
        });

        it('should throw when email exists', async () => {
            const dto = {
                name: 'Test User',
                email: 'test@test.com',
                password: 'Password123!',
            };

            await expect(service.create(dto)).rejects.toThrow('Email already in use');
        });
    });

    describe('findAll', () => {
        it('should return array of users', async () => {
            const result = await service.findAll();
            expect(result).toEqual([mockUser]);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            const result = await service.findOne('1');
            expect(result).toEqual(mockUser);
        });

        it('should throw if user not found', async () => {
            mockRepository.findOne.mockResolvedValueOnce(null);
            await expect(service.findOne('1')).rejects.toThrow('User not found');
        });
    });

    describe('update', () => {
        it('should update user', async () => {
            const dto = {name: 'Updated Name'};
            mockRepository.findOne
                .mockResolvedValueOnce(mockUser)
                .mockResolvedValueOnce(mockUser);
            const result = await service.update('1', dto);
            expect(result).toEqual(mockUser);
            expect(repository.update).toHaveBeenCalled();
        });

        it('should throw on duplicate email', async () => {
            const dto = {email: 'exists@test.com'};
            mockRepository.findOne
                .mockResolvedValueOnce(mockUser)
                .mockResolvedValueOnce({id: '2', email: 'exists@test.com'});
            await expect(service.update('1', dto)).rejects.toThrow('Email already in use');
        });
    });

    describe('updatePassword', () => {
        it('should update password', async () => {
            const dto = {
                oldPassword: 'OldPass123!',
                newPassword: 'NewPass123!',
            };
            const result = await service.updatePassword(mockUser as User, dto);
            expect(result).toEqual({message: 'Password updated successfully'});
        });

        it('should throw on invalid password', async () => {
            jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));
            const dto = {
                oldPassword: 'WrongPass123!',
                newPassword: 'NewPass123!',
            };
            await expect(service.updatePassword(mockUser as User, dto)).rejects.toThrow('Invalid current password');
        });
    });

    describe('updateAccount', () => {
        it('should update account', async () => {
            const dto = {name: 'New Name'};
            const result = await service.updateAccount(mockUser as User, dto);
            expect(result).toEqual(mockUser);
            expect(repository.update).toHaveBeenCalled();
        });
    });
});