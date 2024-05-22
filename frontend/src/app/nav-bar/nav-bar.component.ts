import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { AuthService } from '../services/auth/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CreatePostComponent } from '../posts/create-post/create-post.component';
import { UserService } from '../services/user/user.service';
import { User } from '../common/types';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterModule,
    TranslateModule,
    MenubarModule,
    CommonModule,
    AvatarModule,
    BadgeModule,
    MegaMenuModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    ToastModule,
    DialogModule,
    CreatePostComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  title = 'frontend';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  items: MenuItem[];
  showProfileMenu = false;
  megaMenuItems: MegaMenuItem[] = [];
  sidebarVisible = false;
  pMenuItems: MenuItem[];
  displayCreatePostDialog = false;
  userId: number;
  loggedInUser: User | null = this.storageService.getUser();

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.userId = this.storageService.getUser().id;

    this.items = [
      {
        label: 'Home',
        routerLink: 'home',
      },
      {
        label: 'Admin Board',
        routerLink: 'admin',
        visible: this.showAdminBoard,
      },
      {
        label: 'User Board',
        routerLink: 'user',
      },
      {
        label: 'Profile',
        routerLink: 'profile',
        visible: false,
      },
      {
        label: 'Login',
        routerLink: 'login',
        visible: !this.isLoggedIn,
        command: () => this.logout(),
      },
      {
        label: 'Register',
        routerLink: 'register',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Logout',
        command: () => this.logout(),
        visible: this.isLoggedIn,
      },
      // Add more menu items as needed...
    ];

    this.pMenuItems = [
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        // routerLink: 'profile',
        routerLink: `profile/user/${this.userId}`,
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        routerLink: 'settings',
      },
    ];
    this.authService.loggedInUser$.subscribe((user) => {
      if (user) {
        this.userId = user.id;
        this.updatePMenusItems();
        this.loggedInUser = user;
      }
    });
    if (this.isLoggedIn) {
      this.refreshUserInfo();
    }
  }

  refreshUserInfo(): void {
    this.userService.getUserByUserId(this.userId).subscribe({
      next: (res: any) => {
        const previousUser = this.storageService.getUser();
        const user: User = res.data;
        const newUser = { ...previousUser, ...user };
        this.storageService.saveUser(newUser);
      },
    });
  }

  updatePMenusItems(): void {
    this.pMenuItems = [...this.pMenuItems];
  }

  updateMenuItems(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: 'home',
      },
      {
        label: 'Admin Board',
        routerLink: 'admin',
        visible: this.showAdminBoard,
      },
      {
        label: 'User Board',
        routerLink: 'user',
        visible: this.isLoggedIn,
      },
      {
        label: 'Profile',
        routerLink: 'profile',
        // visible: this.isLoggedIn,
        items: [
          {
            label: 'Profile',
            routerLink: 'profile',
          },
          {
            label: 'Logout',
            command: () => this.logout(),
          },
        ],
      },
      {
        label: 'Login',
        routerLink: 'login',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Register',
        routerLink: 'register',
        visible: !this.isLoggedIn,
      },
      {
        label: 'Logout',
        command: () => this.logout(),
        visible: this.isLoggedIn,
      },
      // Add more menu items as needed...
    ];
  }

  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.username = this.storageService.getUser().username;
      this.updateMenuItems();
    });
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }
    this.updateMenuItems();
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !!this.showProfileMenu;
  }

  closeCallback(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
