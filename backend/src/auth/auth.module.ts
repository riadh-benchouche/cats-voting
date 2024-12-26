import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {User} from '../users/entities/user.entity';
import {AuthService} from './auth.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {AuthController} from "./auth.controller";
import {GoogleStrategy} from "./strategies/google.strategy";
import {UserAuthAccount} from "../auth-accounts/entities/auth-account.entity";
import {GithubStrategy} from "./strategies/github.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('jwt.secret'),
                signOptions: {expiresIn: '1d'},
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature([User, UserAuthAccount]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, GoogleStrategy, GithubStrategy],
    exports: [AuthService],
})

export class AuthModule {
}