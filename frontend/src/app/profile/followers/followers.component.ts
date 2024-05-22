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
  selector: 'app-followers',
  standalone: true,
  imports: [CardModule, TableModule, FollowButtonComponent, RouterModule, UserRowComponent],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnChanges {
  @Input() userId!: number;
  userFollowers: UserWithFollows[] = [];
  defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  @Output() closeDialog = new EventEmitter();
  constructor(private followService: FollowsService) {
    this.getUserFollowers();
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }

  ngOnChanges() {
    this.getUserFollowers();
  }

  getUserFollowers() {
    if (!this.userId) return;
    this.followService.getUserFollowers(this.userId).subscribe((res: any) => {
      this.userFollowers = res.data;
    });
  }
}
