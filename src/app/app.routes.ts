import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { UserView } from './pages/user-view/user-view';
import { FormUser } from './pages/form-user/form-user';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'user/:_id', component: UserView },
  { path: 'newuser', component: FormUser },
  { path: 'updateuser/:_id', component: FormUser },
];