import { Component, OnChanges, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PostsService } from '../services/posts/posts.service';
import { TPostWithUser } from '../posts/posts.type';
import { TabView, TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { PostsComponent } from '../posts/posts.component';
import { UserService } from '../services/user/user.service';
import { User } from '../common/types';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FollowButtonComponent } from './follow-button/follow-button.component';
import { AuthService } from '../services/auth/auth.service';
import { DialogModule } from 'primeng/dialog';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { FollowsComponent } from './follows/follows.component';
import { FollowsService } from '../services/follows/follows.service';

@Component({
  selector: 'app-profile',
  providers: [TabView, PostsComponent],
  standalone: true,
  imports: [
    CardModule,
    TabViewModule,
    TabMenuModule,
    PostsComponent,
    InfiniteScrollModule,
    FollowButtonComponent,
    DialogModule,
    FollowersComponent,
    FollowingComponent,
    FollowsComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnChanges {
  loggedInUser: User | null = this.authService.getLoggedInUserFromStorage();
  currentUser: User | null = null;
  userId: number;
  userPosts: TPostWithUser[] = [];
  loading = false;
  page = 1;
  limit = 2;
  displayFollowsDialog = false;
  followersCount = 0;
  followingCount = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private userService: UserService,
    private storageService: StorageService,
    private authService: AuthService,
    private followService: FollowsService
  ) {
    this.userId = this.activatedRoute.snapshot.params['userId'];

    // subscribe to route params to get userId, in case the profile page is visited directly in the profile page
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['userId'];
      this.initializeComponent();
    });
  }

  closeDialog() {
    this.displayFollowsDialog = false;
  }

  initializeComponent() {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.getUserInfo();
    this.getUserPosts();
  }

  ngOnChanges() {
    this.getUserInfo();
    this.getUserPosts();
  }

  getUserInfo() {
    this.userService.getUserByUserId(this.userId).subscribe({
      next: (res: any) => {
        this.currentUser = res.data;
        if (!this.currentUser!.profileImageUrl) {
          this.currentUser!.profileImageUrl =
            'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png';
        }
        this.getUserPosts();
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.followService.getFollowersCount(this.userId).subscribe({
      next: (res: any) => {
        this.followersCount = res.data.count;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.followService.getFollowingCount(this.userId).subscribe({
      next: (res: any) => {
        this.followingCount = res.data.count;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUserPosts() {
    this.loading = true;
    this.postsService
      .getUserPosts({
        userId: this.userId,
        page: this.page++,
        limit: this.limit,
      })
      .subscribe({
        next: (res: any) => {
          this.userPosts = [...this.userPosts, ...res.data.items];
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  onScroll() {
    this.getUserPosts();
  }

  showFollowsDialog() {
    this.displayFollowsDialog = true;
  }
}
