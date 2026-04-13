import { Routes } from '@angular/router';
import { authGuard, appSelectedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'app-select',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/app-select/app-select.component').then(m => m.AppSelectComponent)
  },
  {
    path: 'map',
    canActivate: [appSelectedGuard],
    loadComponent: () =>
      import('./features/map/map.component').then(m => m.MapComponent)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
