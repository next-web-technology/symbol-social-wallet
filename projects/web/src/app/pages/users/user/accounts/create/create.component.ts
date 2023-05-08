import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAccountCreateComponent } from '../../../../../views/users/user/accounts/create/create.component';
import { SymbolService } from '../../../../../services/blockchain/symbol.service';
import { AccountService } from 'projects/web/src/app/services/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount } from 'projects/web/src/app/services/account/account.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-account-create',
  standalone: true,
  imports: [CommonModule, ViewAccountCreateComponent],
  providers: [],
  template: `
    <app-view-account-create
      [createNewAccountFunc]="createNewAccount"
      [createAccountWithMneonicFunc]="createAccountWithMneonic"
      [createAccountWithPrivateKeyFunc]="createAccountWithPrivateKey"
      [createAccountWithQrFunc]="createAccountWithQr"
      [createAccountWithTextFunc]="createAccountWithText"
    ></app-view-account-create>
  `,
  styles: [],
})
export class AccountCreateComponent {
  userId: string | null;
  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
    localStorage.setItem('blockchain', 'symbol');

    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  createNewAccount = async () => {
    const { userAccount, mnemonic, qr } = await this.accountService.createNewAccount(this.userId);
    console.log(userAccount);
    // return { mnemonic, qr };
    this.router.navigate(['..', userAccount?.id], { relativeTo: this.route });

    // .then(({ userAccount, mnemonic, qr }) => {
    //   console.log(userAccount);
    //   this.router.navigate(['..', userAccount?.id], { relativeTo: this.route });
    // });
  };

  createAccountWithMneonic = async () => {
    await this.accountService.createNewAccount(this.userId).then((account) => {
      console.log(account);
    });
  };

  createAccountWithPrivateKey = async (privateKey: string) => {
    try {
      const account = await this.accountService.createAccountFromPrivateKey(this.userId, privateKey);
      console.log(account);
      this.router.navigate(['..', account?.id], { relativeTo: this.route });
    } catch (error) {
      console.error(error);
    }
  };

  createAccountWithQr = async () => {
    await this.accountService.createNewAccount(this.userId).then((account) => {
      console.log(account);
    });
  };

  createAccountWithText = async () => {
    await this.accountService.createNewAccount(this.userId).then((account) => {
      console.log(account);
    });
  };
}
