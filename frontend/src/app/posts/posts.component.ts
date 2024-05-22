import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { CardModule } from 'primeng/card';
import { TPostWithUser } from './posts.type';
import { CommonModule, NgFor } from '@angular/common';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CustomProgressLoadingComponent } from '../custom-progress-loading/custom-progress-loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
// p confirm dialog
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const POST_MENU_ITEMS = {
  DELETE: 'delete',
  SAVE: 'save',
};
@Component({
  selector: 'app-posts',
  standalone: true,
  providers: [ConfirmationService],
  imports: [
    CardModule,
    CommonModule,
    NgFor,
    VirtualScrollerModule,
    InfiniteScrollModule,
    CustomProgressLoadingComponent,
    ProgressSpinnerModule,
    RouterModule,
    MenuModule,
    ConfirmDialogModule,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit, OnDestroy {
  @Input() posts: TPostWithUser[] = [] as TPostWithUser[];
  firstLoad = true;
  @Input() loading: boolean;
  loggedInUser = this.storageService.getUser();
  postMenuItems: MenuItem[] = [];
  currentPost: TPostWithUser | null = null;

  constructor(
    private postsService: PostsService,
    private storageService: StorageService,
    private confirmationService: ConfirmationService
  ) {
    this.loading = true;
    this.postMenuItems = [
      {
        id: POST_MENU_ITEMS.DELETE,
        label: 'Delete',
        icon: 'pi pi-trash',
        command: (_event) => {
          if (this.currentPost) {
            this.deletePost(this.currentPost);
          }
        },
      },
      {
        id: POST_MENU_ITEMS.SAVE,
        label: 'Save',
        icon: 'pi pi-save',
      },
    ];
  }
  ngOnDestroy(): void {
    console.log(`
  ngOnDestroy is for cleaning up any subscriptions or other resources before the component is destroyed.
  a component is destroyed when it is removed from the DOM. that can happen when the user navigates to a different route or when the user closes the browser tab.
    `);
  }

  ngOnInit() {}

  /**
   * Check if the post is created by the logged in user, if so, show the options that are available to the logged in user
   * @param post
   * @returns
   */
  isLoggedInUserPost(post: TPostWithUser) {
    const isUserPost = post.userId === this.loggedInUser.id;
    this.postMenuItems.find(
      (item) => item.id === POST_MENU_ITEMS.DELETE
    )!.visible = isUserPost;

    return isUserPost;
  }

  setCurrentPost(post: TPostWithUser) {
    this.currentPost = post;
  }

  deletePost(post: TPostWithUser) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this post?',
      accept: () => {
        this.postsService.deletePost(post.id).subscribe(() => {
          this.posts = this.posts.filter((p) => p.id !== post.id);
        });
      },
    });
  }
}
