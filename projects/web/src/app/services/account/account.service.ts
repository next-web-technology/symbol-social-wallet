import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountInfrastructureService } from './account-infrastructure.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SymbolService } from '../blockchain/symbol.service';
import { Account } from 'symbol-sdk';
import { UserAccount } from './account.type';
import { DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { MnemonicPassPhrase } from 'symbol-hd-wallets';

export interface AccountInfrastructureServiceInterface {
  createNewAccount: (account: Account, userId: string | null) => Promise<UserAccount | undefined>;
  createAccountFromPrivateKey: (account: Account, userId: string | null) => Promise<UserAccount | undefined>;
  fetchAccounts: (userId: string | null) => Promise<QueryDocumentSnapshot<UserAccount>[]>;
  fetchAccount: (userId: string | null, accountId: string | null) => Promise<DocumentSnapshot<UserAccount>>;
  // fetchAccount$: (userId: string | null) => Observable<UserAccount | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private accountInfrastructureServiceInterface: AccountInfrastructureServiceInterface;

  constructor(
    accountInfrastructureService: AccountInfrastructureService,
    // private route: ActivatedRoute,
    private symbolService: SymbolService
  ) {
    this.accountInfrastructureServiceInterface = accountInfrastructureService;
  }

  async createNewAccount(userId: string | null): Promise<{
    userAccount: UserAccount | undefined;
    mnemonic: MnemonicPassPhrase;
    qr: string;
  }> {
    const { account, mnemonic, qr } = await this.symbolService.createNewAccount();
    const userAccount = await this.accountInfrastructureServiceInterface.createNewAccount(account, userId);

    return { userAccount, mnemonic, qr };
  }

  // async createAccountWithMneonic();

  async createAccountFromPrivateKey(userId: string | null, privateKey: string): Promise<UserAccount | undefined> {
    try {
      const account = await this.symbolService.createAccountFromPrivateKey(privateKey);
      const isAccount = await this.isAccount(userId, account);
      if (isAccount) {
        throw String('そのアドレスは既に登録されています。');
      } else {
        return this.accountInfrastructureServiceInterface.createAccountFromPrivateKey(account, userId);
      }
    } catch (error) {
      if (typeof error === 'string') {
        throw new Error(error);
      }
      throw new Error('有効ではない秘密鍵が入力されました。');
    }
  }
  // async createAccountWithQr();
  // async createAccountFromMnemonic();
  // async createAccountWithText();

  async fetchAccounts(userId: string | null): Promise<QueryDocumentSnapshot<UserAccount>[]> {
    return this.accountInfrastructureServiceInterface.fetchAccounts(userId);
  }

  async fetchAccount(userId: string | null, accountId: string | null): Promise<DocumentSnapshot<UserAccount>> {
    return this.accountInfrastructureServiceInterface.fetchAccount(userId, accountId);
  }

  async isAccount(userId: string | null, newAccount: Account): Promise<boolean> {
    let isAccount = false;
    await this.fetchAccounts(userId).then((accounts) => {
      accounts.forEach((account) => {
        if (account.data().address === newAccount.address.plain()) {
          isAccount = true;
        }
      });
    });
    return isAccount;
  }
}
