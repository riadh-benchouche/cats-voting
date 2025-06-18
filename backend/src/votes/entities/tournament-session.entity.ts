import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import {User} from "../../users/entities/user.entity";
import {Cat} from "../../cats/entities/cat.entity";

@Entity('tournament_sessions')
export class TournamentSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'current_champion_id', nullable: true })
    currentChampionId: string;

    @ManyToOne(() => Cat, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'current_champion_id' })
    currentChampion: Cat;

    @Column({ name: 'challenger_id', nullable: true })
    challengerId: string;

    @ManyToOne(() => Cat, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'challenger_id' })
    challenger: Cat;

    @Column({ default: 1 })
    round: number;

    @Column({ name: 'is_active', default: true })
    isActive: boolean;

    @Column({ name: 'started_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startedAt: Date;

    @Column({ name: 'last_vote_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastVoteAt: Date;

    @Column({ name: 'ended_at', type: 'timestamp', nullable: true })
    endedAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}