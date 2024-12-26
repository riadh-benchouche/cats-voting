import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let userRepository: any;

    const mockUserRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    const mockJwtService = {
        sign: jest.fn(() => 'mock.jwt.token'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService,
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        userRepository = module.get(getRepositoryToken(User));
    });

    describe('register', () => {
        it('should register a new user', async () => {
            const registerDto = {
                email: 'test@test.com',
                password: 'Password123!',
                name: 'Test User',
            };

            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const savedUser = { ...registerDto, id: 1, password: hashedPassword };

            mockUserRepository.findOne.mockResolvedValue(null);
            mockUserRepository.create.mockReturnValue(savedUser);
            mockUserRepository.save.mockResolvedValue(savedUser);

            const result = await service.register(registerDto);

            expect(result).toHaveProperty('access_token');
            expect(result.user).toHaveProperty('email', registerDto.email);
            expect(mockUserRepository.save).toHaveBeenCalled();
        });
    });
});