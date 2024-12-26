import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {RegisterDto, LoginDto} from './schemas/auth.schema';
import {User} from "../users/entities/user.entity";
import {AuthProvider, UserAuthAccount} from "../auth-accounts/entities/auth-account.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserAuthAccount)
        private readonly userAuthAccountRepository: Repository<UserAuthAccount>,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.userRepository.findOne({where: {email}});

        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {email: user.email, sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.userRepository.findOne({
            where: {email: registerDto.email}
        });

        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword,
        });

        await this.userRepository.save(user);

        const {password, ...result} = user;
        const payload = {email: user.email, sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
            user: result
        };
    }

    private generateJwtToken(user: User) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }

    async handleGoogleAuth(profile: any) {
        let user = await this.userRepository.findOne({
            where: {email: profile.email}
        });

        let authAccount = await this.userAuthAccountRepository.findOne({
            where: {
                providerId: profile.providerId,
                provider: AuthProvider.GOOGLE
            }
        });

        if (!user) {
            user = this.userRepository.create({
                email: profile.email,
                name: profile.name,
            });
            await this.userRepository.save(user);
        }

        if (!authAccount) {
            authAccount = this.userAuthAccountRepository.create({
                provider: AuthProvider.GOOGLE,
                providerId: profile.providerId,
                email: profile.email,
                user,
                access_token: profile.accessToken,
                refresh_token: profile.refreshToken
            });
            await this.userAuthAccountRepository.save(authAccount);
        }

        return this.generateJwtToken(user);
    }

    async handleGithubAuth(profile: any) {
        let user = await this.userRepository.findOne({
            where: {email: profile.email}
        });

        let authAccount = await this.userAuthAccountRepository.findOne({
            where: {
                providerId: profile.providerId,
                provider: AuthProvider.GITHUB
            }
        });

        if (!user) {
            user = this.userRepository.create({
                email: profile.email,
                name: profile.name,
            });
            await this.userRepository.save(user);
        }

        if (!authAccount) {
            authAccount = this.userAuthAccountRepository.create({
                provider: AuthProvider.GITHUB,
                providerId: profile.providerId,
                email: profile.email,
                user,
                access_token: profile.accessToken,
                refresh_token: profile.refreshToken
            });
            await this.userAuthAccountRepository.save(authAccount);
        }

        return this.generateJwtToken(user);
    }
}