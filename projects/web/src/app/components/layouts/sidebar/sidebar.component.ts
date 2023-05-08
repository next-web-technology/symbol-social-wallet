import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, mergeMap, of } from 'rxjs';
import { User } from '../../../services/user/user.type';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { RouterModule } from '@angular/router';
import { SignOutButtonComponent } from '../../elements/buttons/sign-out.component';
import { AccountService } from '../../../services/account/account.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faHome, faFolder } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-component-layout-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, SignOutButtonComponent],
  template: `
    <label for="app-drawer" class="drawer-overlay"></label>
    <ul class="menu w-48 bg-base-100 border-r-2">
      <li>
        <img class="w-48 bg-base-100" src="../assets/xymcity_cityscape_small.png" alt="XYM City Cityspace Image" />
      </li>
      <li>
        <a class="btn btn-ghost gap-2 flex flex-row justify-start" routerLink="/">
          <fa-icon [icon]="faHome"></fa-icon>
          Home
        </a>
      </li>
      <ng-container *ngIf="userId$ | async as userId">
        <li>
          <a class="btn btn-ghost gap-2 flex flex-row justify-start" [routerLink]="['/users', userId]">
            <fa-icon [icon]="faUser"></fa-icon>
            User
          </a>
        </li>
        <li>
          <a class="btn btn-ghost flex flex-row justify-start" [routerLink]="['/users', userId, 'accounts']">
            <fa-icon [icon]="faFolder"></fa-icon>
            Accounts
          </a>
        </li>
      </ng-container>
      <app-component-sign-out-button></app-component-sign-out-button>
    </ul>
  `,
  styles: [],
})
export class SidebarComponent {
  faBars = faBars;
  faUser = faUser;
  faHome = faHome;
  faFolder = faFolder;
  userId$: Observable<string>;
  user$: Observable<User | null | undefined>;
  blockchain = 'symbol';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private accountService: AccountService
  ) {
    this.userId$ = this.authService.fetchAuthState$().pipe(map((user) => (user ? user.uid : '')));
    this.user$ = this.userId$.pipe(mergeMap((uid) => (uid ? this.userService.fetchUser$(uid) : of(undefined))));
  }
}
