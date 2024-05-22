import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authGuard } from './guards/auth.guard';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/user/:userId', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'user', component: BoardUserComponent, canActivate: [authGuard] },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: NotFoundComponent },
  // dont put any routes after this one, it will always redirect to the not found component
];
