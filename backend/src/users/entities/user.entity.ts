import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import {Vote} from "../../votes/entities/vote.entity";
import {UserAuthAccount} from "../../auth-accounts/entities/auth-account.entity";
import {Role} from "../schema/roles.enum";
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column({ nullable: true })
    password: string;

    @Column({ default: Role.USER })
    role: Role;

    @OneToMany(() => Vote, vote => vote.user)
    votes: Vote[];

    @OneToMany(() => UserAuthAccount, auth => auth.user)
    authAccounts: UserAuthAccount[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}