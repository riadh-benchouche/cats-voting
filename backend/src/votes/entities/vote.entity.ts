import {Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, Column} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {Cat} from '../../cats/entities/cat.entity';

@Entity('votes')
export class Vote {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cat, cat => cat.votingRecords, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'cat_id'})
    cat: Cat;

    @ManyToOne(() => User, user => user.votes, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;


    @CreateDateColumn()
    created_at: Date;
}