import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAccountsComponent } from '../../../../views/users/user/accounts/accounts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount } from 'projects/web/src/app/services/account/account.type';
import { Observable } from 'rxjs';
import { AccountService } from 'projects/web/src/app/services/account/account.service';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-page-accounts',
  standalone: true,
  imports: [CommonModule, ViewAccountsComponent],
  providers: [],
  template: ` <app-view-accounts [accounts]="accounts"></app-view-accounts> `,
  styles: [],
})
export class AccountsComponent {
  userId: string | null;
  accountId: string | null;
  accounts!: QueryDocumentSnapshot<UserAccount>[];

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
    this.accountId = this.route.snapshot.paramMap.get('accountId');
    this.userId = this.route.snapshot.paramMap.get('userId');

    (async () => {
      await this.fetchAccounts().then((accounts) => {
        this.accounts = accounts;
      });
      if (!this.accounts) {
        console.log(this.accounts);
        this.router.navigate(['create'], { relativeTo: this.route, queryParams: { mode: 'new' } });
      }
    })();
  }

  async fetchAccounts(): Promise<QueryDocumentSnapshot<UserAccount>[]> {
    return await this.accountService.fetchAccounts(this.userId);
  }
}
