import { Firestore } from '@angular/fire/firestore';
import { AccountInfrastructureService } from './account-infrastructure.service';

describe('AccountInfrastructureService', () => {
  let service: AccountInfrastructureService;
  let dbSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    dbSpy = jasmine.createSpyObj('Firestore', [
      'addDoc',
      'collection',
      'doc',
      'getDoc',
      'docData',
      'updateDoc',
      'deleteDoc',
    ]);
    service = new AccountInfrastructureService(dbSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
