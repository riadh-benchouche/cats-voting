import {Module} from '@nestjs/common';
import {CatsService} from './cats.service';
import {CatsController} from './cats.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cat} from "./entities/cat.entity";
import {Vote} from "../votes/entities/vote.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Cat, Vote])],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule {
}
