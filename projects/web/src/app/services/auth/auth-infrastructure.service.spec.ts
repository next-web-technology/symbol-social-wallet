import { TestBed } from '@angular/core/testing';

import { AuthInfrastructureService } from './auth-infrastructure.service';

xdescribe('AuthInfrastructureService', () => {
  let service: AuthInfrastructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInfrastructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
