import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TabView, TabViewModule } from 'primeng/tabview';
import { FollowingComponent } from '../following/following.component';
import { FollowersComponent } from '../followers/followers.component';
import { UserWithFollows } from '../../common/types/user.type';
import { FollowsService } from '../../services/follows/follows.service';

@Component({
  selector: 'app-follows',
  standalone: true,
  providers: [TabView],
  imports: [
    DialogModule,
    TabViewModule,
    FollowersComponent,
    FollowingComponent,
  ],
  templateUrl: './follows.component.html',
  styleUrl: './follows.component.scss',
})
export class FollowsComponent implements OnChanges {
  @Input() userId!: number;
  userFollowers: UserWithFollows[] = [];
  userFollowing: UserWithFollows[] = [];
  @Output() closeDialog = new EventEmitter();
  constructor(private followService: FollowsService) {
    this.getUserFollowers();
    this.getUserFollowing();
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }
  
  ngOnChanges() {
    this.getUserFollowers();
    this.getUserFollowing();
  }

  getUserFollowers() {
    if (!this.userId) return;
    this.followService.getUserFollowers(this.userId).subscribe((res: any) => {
      this.userFollowers = res.data;
    });
  }

  getUserFollowing() {
    if (!this.userId) return;
    this.followService.getUserFollowing(this.userId).subscribe((res: any) => {
      this.userFollowing = res.data;
    });
  }
}
