import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Users } from './users.entity';
import { FileStorageService } from '../file-storage/file-storage.service';
import {
  EMAIL_FOR_TESTING,
  USERNAME_FOR_TESTING,
} from '../auth/utils/singInUser';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<Users> {
  private fileStorageService: FileStorageService = new FileStorageService();
  constructor() {}
  listenTo() {
    return Users;
  }

  async beforeInsert(event: InsertEvent<Users>) {
    await validateOrReject(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<Users>) {
    await validateOrReject(event.entity);
  }
  async afterLoad(entity: Users): Promise<any> {
    if (entity.profileImageKey) {
      const profileImageUrl = await this.fileStorageService.getSignedUrl(
        entity.profileImageKey,
      );
      entity.profileImageUrl = profileImageUrl;
    }
  }
  async beforeRemove(event: RemoveEvent<Users>): Promise<any> {
    if (
      event.entity.email === EMAIL_FOR_TESTING ||
      event.entity.username === USERNAME_FOR_TESTING
    ) {
      throw new Error(
        `You should not delete the user for testing purposes with email: ${EMAIL_FOR_TESTING} or username: ${USERNAME_FOR_TESTING}`,
      );
    }
  }
}
