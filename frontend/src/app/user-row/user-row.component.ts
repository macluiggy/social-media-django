import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { FollowButtonComponent } from '../profile/follow-button/follow-button.component';
import { DEFAULT_PROFILE_IMAGE } from '../common/constants';
import { UserWithFollows } from '../common/types/user.type';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [TableModule, RouterModule, FollowButtonComponent],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.scss',
})
export class UserRowComponent {
  defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  @Input() users: UserWithFollows[] = [];
  @Output() closeDialog = new EventEmitter();

  handleUserClick() {
    this.closeDialog.emit();
  }
}
