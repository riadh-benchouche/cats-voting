import {DataSource} from 'typeorm';
import {config} from 'dotenv';
import {User} from "../users/entities/user.entity";
import {Cat} from "../cats/entities/cat.entity";
import {Vote} from "../votes/entities/vote.entity";
import {UserAuthAccount} from "../auth-accounts/entities/auth-account.entity";
config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Cat, Vote, UserAuthAccount],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    synchronize: false,
});