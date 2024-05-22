import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { UserWithFollows } from '../../common/types/user.type';
import { FollowsService } from '../../services/follows/follows.service';
import { CardModule } from 'primeng/card';
import { DEFAULT_PROFILE_IMAGE } from '../../common/constants';
import { TableModule } from 'primeng/table';
import { FollowButtonComponent } from '../follow-button/follow-button.component';
import { RouterModule } from '@angular/router';
import { UserRowComponent } from '../../user-row/user-row.component';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    FollowButtonComponent,
    RouterModule,
    UserRowComponent,
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss',
})
export class FollowingComponent implements OnChanges {
  @Input() userId!: number;
  userFollowing: UserWithFollows[] = [];
  defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  @Output() closeDialog = new EventEmitter();
  constructor(private followService: FollowsService) {
    this.getUserFollowing();
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }

  ngOnChanges() {
    this.getUserFollowing();
  }

  getUserFollowing() {
    if (!this.userId) return;

    this.followService.getUserFollowing(this.userId).subscribe((res: any) => {
      this.userFollowing = res.data;
    });
  }
}
