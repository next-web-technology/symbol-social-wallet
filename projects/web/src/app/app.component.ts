import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { SignInWithGooglePopupButtonComponent } from './components/buttons/sign-in-with-google-popup-button/sign-in-with-google-popup-button.component';
import { SignInWithGoogleRedirectButtonComponent } from './components/buttons/sign-in-with-google-redirect-button/sign-in-with-google-redirect-button.component';
import { SignOutButtonComponent } from './components/buttons/sign-out-button/sign-out-button.component';
import { map, mergeMap, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from './services/user/user.type';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FontAwesomeModule,
    SignInWithGooglePopupButtonComponent,
    SignInWithGoogleRedirectButtonComponent,
    SignOutButtonComponent,
  ],
  template: `
    <div class="drawer drawer-mobile">
      <!-- hidden element -->
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />

      <div class="drawer-content flex flex-col">
        <!-- nav bar -->
        <div class="w-full navbar bg-base-100">
          <div class="flex-none lg:hidden">
            <label for="app-drawer" class="btn btn-square btn-ghost">
              <fa-icon [icon]="faBars"></fa-icon>
            </label>
          </div>
          <div class="flex-1 justify-center">
            <a class="btn btn-ghost normal-case text-xl" routerLink="/">Symbol Social Wallet</a>
          </div>
          <div class="flex-none">
            <ng-container *ngIf="user$ | async as user; else notSignIn">
              <!-- dropdown menu(authenticated) -->
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-12 rounded-full flex justify-center items-center">
                    <ng-container *ngIf="user.photoUrl; else noPhoto">
                      <img [src]="user.photoUrl" alt="User's photo" class="w-12 flex justify-center items-center" />
                    </ng-container>
                    <ng-template #noPhoto>
                      <fa-icon [icon]="faUser" class="w-12 h-12 flex justify-center items-center"></fa-icon>
                    </ng-template>
                  </div>
                </label>
                <ul tabindex="0" class="shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-48">
                  <li>
                    <app-component-sign-out-button></app-component-sign-out-button>
                  </li>
                </ul>
              </div>
            </ng-container>
            <ng-template #notSignIn>
              <!-- dropdown menu(not authenticated) -->
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="w-12 rounded-full flex justify-center items-center">
                    <fa-icon [icon]="faUser" class="w-12 h-12 flex justify-center items-center"></fa-icon>
                  </div>
                </label>
                <ul tabindex="0" class="shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-60">
                  <li class="center">
                    <app-component-sign-in-with-google-popup-button [labelText]="'Sign in with Google'" />
                  </li>
                  <li>
                    <app-component-sign-in-with-google-redirect-button [labelText]="'Sign in with Google'" />
                  </li>
                </ul>
              </div>
            </ng-template>
          </div>
        </div>

        <!-- progress bar -->
        <!-- not working? -->
        <ng-container *ngIf="loading$ | async as loading">
          <progress class="progress w-full"></progress>
        </ng-container>

        <!-- page content -->
        <div class="container mx-auto">
          <router-outlet></router-outlet>
        </div>
      </div>

      <!-- side bar -->
      <div class="drawer-side">
        <label for="app-drawer" class="drawer-overlay"></label>
        <ul class="menu w-48 bg-base-100 border-r-2">
          <li>
            <img class="w-48 bg-base-100" src="../assets/xymcity_cityscape_small.png" alt="XYM City Cityspace Image" />
          </li>
          <li>
            <a class="btn btn-ghost flex flex-row justify-start" routerLink="/">
              <fa-icon [icon]="faHome"></fa-icon>
              Home
            </a>
          </li>
          <ng-container *ngIf="uid$ | async as uid">
            <li>
              <a class="btn btn-ghost flex flex-row justify-start" [routerLink]="['/users', uid]">
                <fa-icon [icon]="faUser"></fa-icon>
                User
              </a>
            </li>
          </ng-container>
        </ul>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'web';
  faBars = faBars;
  faUser = faUser;
  faHome = faHome;
  uid$: Observable<string>;
  user$: Observable<User | null | undefined>;
  loading$: Observable<boolean>;

  constructor(private authService: AuthService, private userService: UserService) {
    this.uid$ = this.authService.fetchAuthState$().pipe(map((user) => (user ? user.uid : '')));
    this.user$ = this.uid$.pipe(mergeMap((uid) => (uid ? this.userService.fetchUser$(uid) : of(undefined))));
    this.loading$ = this.user$.pipe(map((user) => user === null));
  }
}
