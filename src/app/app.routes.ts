// app.routes.ts — updated
import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { FeedComponent } from './features/feed/feed/feed';
import { ProfileComponent } from './features/profile/profile/profile';
import { ChatComponent } from './features/chat/chat/chat';
import { NotificationsComponent } from './features/notifications/notifications/notifications';
import { SearchComponent } from './features/search/search/search';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '',            redirectTo: 'feed',          pathMatch: 'full' },
  { path: 'login',       component: LoginComponent },
  { path: 'register',    component: RegisterComponent },
  {
    path: 'feed',
    component: FeedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'feed' }
];