import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthUserGuard } from './guards/auth-user.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then((x) => x.HomeComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'users/:userId',
        loadComponent: () => import('./pages/users/user/user.component').then((x) => x.UserComponent),
        canActivate: [AuthUserGuard],
      },
      {
        path: 'users/:userId/blockchains/:blockchain',
        loadComponent: () =>
          import('./pages/users/user/blockchains/blockchain/blockchain.component').then((x) => x.BlockchainComponent),
      },
      {
        path: 'users/:userId/accounts',
        loadComponent: () => import('./pages/users/user/accounts/accounts.component').then((x) => x.AccountsComponent),
      },
      {
        path: 'users/:userId/accounts/create',
        loadComponent: () =>
          import('./pages/users/user/accounts/create/create.component').then((x) => x.AccountCreateComponent),
      },
      {
        path: 'users/:userId/accounts/:accountId',
        loadComponent: () =>
          import('./pages/users/user/accounts/account/account.component').then((x) => x.AccountComponent),
      },
    ],
  },
  {
    path: 'auth/sign-in',
    loadComponent: () => import('./pages/auth/sign-in/sign-in.component').then((x) => x.SignInComponent),
  },
  // { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];
