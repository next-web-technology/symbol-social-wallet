import { AuthInfrastructureService } from './auth-infrastructure.service';
import { Auth } from '@angular/fire/auth';

describe('AccountInfrastructureService', () => {
  let service: AuthInfrastructureService;
  let authSpy: jasmine.SpyObj<Auth>;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('Auth', ['currentUser']);
    service = new AuthInfrastructureService(authSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
