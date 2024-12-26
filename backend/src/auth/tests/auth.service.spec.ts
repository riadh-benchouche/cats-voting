import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from '@nestjs/jwt';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {AuthService} from "../auth.service";
import {User} from "../../users/entities/user.entity";
import {UserAuthAccount} from "../../auth-accounts/entities/auth-account.entity";

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let userRepository: Repository<User>;
    let authAccountRepository: Repository<UserAuthAccount>;

    const mockUser = {
        id: '1',
        email: 'test@test.com',
        name: 'Test User',
        password: 'hashedPassword',
        role: 'USER'
    };

    const mockJwtService = {
        sign: jest.fn().mockReturnValue('mock.jwt.token'),
    };

    const mockUserRepository = {
        findOne: jest.fn(),
        create: jest.fn().mockReturnValue(mockUser),
        save: jest.fn().mockResolvedValue(mockUser),
    };

    const mockAuthAccountRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
                {
                    provide: getRepositoryToken(UserAuthAccount),
                    useValue: mockAuthAccountRepository,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        userRepository = module.get(getRepositoryToken(User));
        authAccountRepository = module.get(getRepositoryToken(UserAuthAccount));

        jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
    });

    describe('validateUser', () => {
        it('should return user without password on valid credentials', async () => {
            mockUserRepository.findOne.mockResolvedValueOnce(mockUser);
            const result = await service.validateUser('test@test.com', 'password');
            const {password, ...expected} = mockUser;
            expect(result).toEqual(expected);
        });

        it('should return null on invalid credentials', async () => {
            mockUserRepository.findOne.mockResolvedValueOnce(null);
            const result = await service.validateUser('wrong@email.com', 'password');
            expect(result).toBeNull();
        });
    });

    describe('login', () => {
        it('should return access token and user on successful login', async () => {
            const loginDto = {email: 'test@test.com', password: 'password'};
            mockUserRepository.findOne.mockResolvedValueOnce(mockUser);

            const result = await service.login(loginDto);
            expect(result).toHaveProperty('access_token');
            expect(result).toHaveProperty('user');
            expect(jwtService.sign).toHaveBeenCalled();
        });

        it('should throw UnauthorizedException on invalid credentials', async () => {
            const loginDto = {email: 'wrong@email.com', password: 'password'};
            mockUserRepository.findOne.mockResolvedValueOnce(null);

            await expect(service.login(loginDto)).rejects.toThrow('Invalid credentials');
        });
    });

    describe('register', () => {
        it('should create user and return access token', async () => {
            const registerDto = {
                email: 'new@test.com',
                password: 'password',
                name: 'New User'
            };
            mockUserRepository.findOne.mockResolvedValueOnce(null);

            const result = await service.register(registerDto);
            expect(result).toHaveProperty('access_token');
            expect(result).toHaveProperty('user');
            expect(mockUserRepository.save).toHaveBeenCalled();
        });

        it('should throw UnauthorizedException on existing email', async () => {
            const registerDto = {
                email: 'exists@test.com',
                password: 'password',
                name: 'Test User'
            };
            mockUserRepository.findOne.mockResolvedValueOnce(mockUser);

            await expect(service.register(registerDto)).rejects.toThrow('Email already exists');
        });
    });

    describe('handleGoogleAuth', () => {
        it('should create new user and auth account if not exists', async () => {
            const profile = {
                email: 'google@test.com',
                name: 'Google User',
                providerId: 'google123',
                accessToken: 'google_token',
                refreshToken: 'refresh_token'
            };

            mockUserRepository.findOne.mockResolvedValueOnce(null);
            mockAuthAccountRepository.findOne.mockResolvedValueOnce(null);

            const result = await service.handleGoogleAuth(profile);
            expect(result).toHaveProperty('access_token');
            expect(mockUserRepository.save).toHaveBeenCalled();
            expect(mockAuthAccountRepository.save).toHaveBeenCalled();
        });

        it('should link auth account to existing user', async () => {
            const profile = {
                email: 'existing@test.com',
                name: 'Existing User',
                providerId: 'google123',
                accessToken: 'google_token',
                refreshToken: 'refresh_token'
            };

            mockUserRepository.findOne.mockResolvedValueOnce(mockUser);
            mockAuthAccountRepository.findOne.mockResolvedValueOnce(null);

            const result = await service.handleGoogleAuth(profile);
            expect(result).toHaveProperty('access_token');
            expect(mockAuthAccountRepository.save).toHaveBeenCalled();
        });
    });

    describe('handleGithubAuth', () => {
        // Similar tests as handleGoogleAuth
        it('should create new user and auth account if not exists', async () => {
            const profile = {
                email: 'github@test.com',
                name: 'Github User',
                providerId: 'github123',
                accessToken: 'github_token',
                refreshToken: 'refresh_token'
            };

            mockUserRepository.findOne.mockResolvedValueOnce(null);
            mockAuthAccountRepository.findOne.mockResolvedValueOnce(null);

            const result = await service.handleGithubAuth(profile);
            expect(result).toHaveProperty('access_token');
            expect(mockUserRepository.save).toHaveBeenCalled();
            expect(mockAuthAccountRepository.save).toHaveBeenCalled();
        });
    });
});