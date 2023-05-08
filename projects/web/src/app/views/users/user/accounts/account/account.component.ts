import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserAccount } from 'projects/web/src/app/services/account/account.type';
import { AccountService } from '../../../../../services/account/account.service';
import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-view-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-10">
      <h2 class=" text-1xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl ">Account</h2>
    </div>
    <p>{{ account?.id }}</p>
    <p>{{ account?.address }}</p>
    <p>{{ account?.blockchain }}</p>
    <p>{{ account?.networkType }}</p>
    <p>{{ account?.publicKey }}</p>
    <p>{{ account?.createdAt }}</p>
  `,
  styles: [],
})
export class ViewAccountComponent {
  account?: UserAccount;
  userId: string | null;
  accountId: string | null;

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.accountId = this.route.snapshot.paramMap.get('accountId');

    this.fetchAccount().then((account) => {
      this.account = account.data();
    });
    // const navigation = this.router.getCurrentNavigation();
    // this.account = navigation?.extras.state?.['account'];
  }
  async fetchAccount(): Promise<DocumentSnapshot<UserAccount>> {
    return await this.accountService.fetchAccount(this.userId, this.accountId);
  }
}
