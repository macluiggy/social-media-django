import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users.entity';

// typeorm entity
@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'follower_id' })
  followerId: number;

  @Column({ name: 'following_id' })
  followingId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'follower_id' })
  follower: Users;

  @ManyToOne(
    () => Users,
    {
      onDelete: 'CASCADE',
    } /** , (user) => user.following */,
  )
  @JoinColumn({ name: 'following_id' })
  following: Users;
}
