import { Post } from './entities/post.entity';
import { faker } from '@faker-js/faker';

export default function generatePost({ userId }): Post {
  const post = new Post();
  post.title = faker.lorem.sentence();
  post.content = faker.lorem.paragraphs(3);
  post.userId = userId;
  return post;
}
