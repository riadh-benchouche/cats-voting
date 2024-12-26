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

@Entity('cats')
export class Cat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string;

    @Column({default: 0})
    votes: number;

    @OneToMany(() => Vote, vote => vote.cat)
    votingRecords: Vote[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}