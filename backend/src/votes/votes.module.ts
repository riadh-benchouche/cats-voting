import {Module} from '@nestjs/common';
import {VotesService} from './votes.service';
import {VotesController} from './votes.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Vote} from "./entities/vote.entity";
import {CatsService} from "../cats/cats.service";
import {CatsModule} from "../cats/cats.module";
import {UsersModule} from "../users/users.module";
import {TournamentSession} from "./entities/tournament-session.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Vote, TournamentSession]), CatsModule, UsersModule],
    controllers: [VotesController],
    providers: [VotesService],
    exports: [VotesService]
})
export class VotesModule {
}
