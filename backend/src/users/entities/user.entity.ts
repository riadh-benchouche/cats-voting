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

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({ nullable: true })
    password: string;

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