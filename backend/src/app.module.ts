import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {databaseConfig} from "./common/config/database.config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from './users/users.module';
import {CatsModule} from './cats/cats.module';
import {VotesModule} from './votes/votes.module';
import {AuthAccountsModule} from './auth-accounts/auth-accounts.module';
import {AuthModule} from "./auth/auth.module";
import {jwtConfig} from "./common/config/jwt.config";
// import {CatDataInitializerService} from "./cats/cat-data-initializer.service";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [databaseConfig, jwtConfig],
    }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.get('database'),
        }),
        UsersModule,
        CatsModule,
        VotesModule,
        AuthAccountsModule,
        AuthModule,
        HttpModule,
    ],
    controllers: [AppController],
    providers: [AppService,
        // CatDataInitializerService
    ],
})
export class AppModule {
}
