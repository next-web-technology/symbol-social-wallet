import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { UserInfrastructureService } from './user-infrastructure.service';

describe('UserInfrastructureService', () => {
  let service: UserInfrastructureService;
  let dbSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Firestore,
          useValue: jasmine.createSpyObj('Firestore', [
            'addDoc',
            'collection',
            'doc',
            'getDoc',
            'docData',
            'updateDoc',
            'deleteDoc',
          ]),
        },
      ],
    });
    service = TestBed.inject(UserInfrastructureService);
    dbSpy = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
