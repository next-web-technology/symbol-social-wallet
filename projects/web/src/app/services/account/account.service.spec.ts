import { AccountService } from './account.service';
import { AccountInfrastructureService } from './account-infrastructure.service';
import { SymbolService } from '../blockchain/symbol.service';
import { Firestore } from '@angular/fire/firestore';

describe('AuthService', () => {
  let service: AccountService;
  let AccountInfrastructureServiceSpy: jasmine.SpyObj<AccountInfrastructureService>;
  let SymbolServiceSpy: jasmine.SpyObj<SymbolService>;
  // let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    AccountInfrastructureServiceSpy = jasmine.createSpyObj('AuthInfrastructureService', [
      'createAccount',
      'createAccountWithPrivateKey',
      'fetchAccounts',
      'fetchAccount',
    ]);

    service = new AccountService(AccountInfrastructureServiceSpy, SymbolServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
