import { CreateTableSeeders1713999461685 } from './1713922909414-create-table-seeders';
import { CreateTableUser1684206622652 } from './1713999461685-create-users';
import { CreateTablePosts1715007703628 } from './1715007703628-create-table-posts';
import { AddProfileKeyToUsersTable1715898100002 } from './1715898100002-add-profile-key-to-users-table';
import { CreateFollowTable1716224928997 } from './1716224928997-create-follow-table';

const DB_MIGRATIONS = [
  CreateTableSeeders1713999461685,
  CreateTableUser1684206622652,
  CreateTablePosts1715007703628,
  AddProfileKeyToUsersTable1715898100002,
  CreateFollowTable1716224928997,
];

export default DB_MIGRATIONS;
