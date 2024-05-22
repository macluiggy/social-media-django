import { Module, ModuleMetadata } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsController } from './follows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { FileStorageService } from '../../file-storage/file-storage.service';

const followsModuleMetadata: ModuleMetadata = {
  controllers: [FollowsController],
  providers: [FollowsService, FileStorageService],
  imports: [TypeOrmModule.forFeature([Follow])],
};
@Module(followsModuleMetadata)
export class FollowsModule {}

export { followsModuleMetadata };
