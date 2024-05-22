import { Post } from '../posts/entities/post.entity';
import { Follow } from '../users/follows/entities/follow.entity';
import { Users } from '../users/users.entity';
import { SeederEntity } from './seeders.entity';

export const entitiesObject = {
  Users,
  SeederEntity,
};

export type Entities = Users | SeederEntity | Post;
export default [Users, SeederEntity, Post, Follow];
