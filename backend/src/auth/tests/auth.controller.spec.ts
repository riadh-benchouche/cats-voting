import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from "../auth.service";
import {AuthController} from "../auth.controller";

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    const mockAuthService = {
        register: jest.fn(),
        login: jest.fn(),
        handleGoogleAuth: jest.fn(),
        handleGithubAuth: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService
                }
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    describe('register', () => {
        it('should register user', async () => {
            const registerDto = {
                email: 'test@test.com',
                password: 'Password123!',
                name: 'Test User'
            };
            const expectedResult = {
                access_token: 'token',
                user: {id: '1', email: registerDto.email}
            };

            mockAuthService.register.mockResolvedValue(expectedResult);

            const result = await controller.register(registerDto);
            expect(result).toEqual(expectedResult);
            expect(service.register).toHaveBeenCalledWith(registerDto);
        });
    });

    describe('login', () => {
        it('should login user', async () => {
            const loginDto = {
                email: 'test@test.com',
                password: 'Password123!'
            };
            const expectedResult = {
                access_token: 'token',
                user: {id: '1', email: loginDto.email}
            };

            mockAuthService.login.mockResolvedValue(expectedResult);

            const result = await controller.login(loginDto);
            expect(result).toEqual(expectedResult);
            expect(service.login).toHaveBeenCalledWith(loginDto);
        });
    });

    describe('googleAuthCallback', () => {
        it('should handle google auth callback', async () => {
            const req = {
                user: {
                    email: 'test@gmail.com',
                    name: 'Test User'
                }
            };
            const expectedResult = {
                access_token: 'token',
                user: {id: '1', email: req.user.email}
            };

            mockAuthService.handleGoogleAuth.mockResolvedValue(expectedResult);

            const result = await controller.googleAuthCallback(req);
            expect(result).toEqual(expectedResult);
            expect(service.handleGoogleAuth).toHaveBeenCalledWith(req.user);
        });
    });

    describe('githubAuthCallback', () => {
        it('should handle github auth callback', async () => {
            const req = {
                user: {
                    email: 'test@github.com',
                    name: 'Test User'
                }
            };
            const expectedResult = {
                access_token: 'token',
                user: {id: '1', email: req.user.email}
            };

            mockAuthService.handleGithubAuth.mockResolvedValue(expectedResult);

            const result = await controller.githubAuthCallback(req);
            expect(result).toEqual(expectedResult);
            expect(service.handleGithubAuth).toHaveBeenCalledWith(req.user);
        });
    });
});