import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent) },
      { path: 'tasks', loadComponent: () => import('./features/tasks/task-list/task-list.component').then(m => m.TaskListComponent) },
      { path: 'tasks/new', loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) },
      { path: 'tasks/:id/edit', loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
