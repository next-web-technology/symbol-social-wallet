import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAccountComponent } from '../../../../../views/users/user/accounts/account/account.component';

@Component({
  selector: 'app-page-account',
  standalone: true,
  imports: [CommonModule, ViewAccountComponent],
  providers: [],
  template: ` <app-view-account></app-view-account> `,
  styles: [],
})
export class AccountComponent {}
