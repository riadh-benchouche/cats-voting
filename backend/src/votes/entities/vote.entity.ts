import {Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, Column} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {Cat} from '../../cats/entities/cat.entity';

@Entity('votes')
@Index(['userId', 'catId'], { unique: true })
export class Vote {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    catId: string;

    @Column()
    userId: string;

    @ManyToOne(() => Cat, cat => cat.votingRecords)
    @JoinColumn({name: 'cat_id'})
    cat: Cat;

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at: Date;
}