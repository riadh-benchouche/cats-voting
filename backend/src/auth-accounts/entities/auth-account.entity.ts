import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import {User} from "../../users/entities/user.entity";

export enum AuthProvider {
    LOCAL = 'local',
    GOOGLE = 'google',
    GITHUB = 'github'
}

@Entity('user_auth_accounts')
export class UserAuthAccount {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: AuthProvider;

    @Column({name: 'provider_id'})
    providerId: string;

    @Column({nullable: true})
    email: string;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({name: 'user_id'})
    userId: string;

    @Column({nullable: true})
    access_token: string;

    @Column({nullable: true})
    refresh_token: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}