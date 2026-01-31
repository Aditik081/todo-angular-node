import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { TodoComponent } from './todo/todo/todo';





export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register) },
  { path: 'todo', loadComponent: () => import('./todo/todo/todo').then(m => m.TodoComponent) },
  { path: '**', redirectTo: 'login' }
];
