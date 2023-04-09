import { Firestore } from '@angular/fire/firestore';
import { UserInfrastructureService } from './user-infrastructure.service';

describe('UserInfrastructureService', () => {
  let service: UserInfrastructureService;
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
    service = new UserInfrastructureService(dbSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
