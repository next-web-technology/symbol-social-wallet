import { AuthService } from './auth.service';
import { AuthInfrastructureService } from './auth-infrastructure.service';
import { User } from '@angular/fire/auth';
import { of } from 'rxjs';
import { UserCredential } from 'firebase/auth';

describe('AuthService', () => {
  let service: AuthService;
  let authInfrastructureServiceSpy: jasmine.SpyObj<AuthInfrastructureService>;

  beforeEach(async () => {
    authInfrastructureServiceSpy = jasmine.createSpyObj('AuthInfrastructureService', [
      'signInWithGooglePopup',
      'signInWithGoogleRedirect',
      'getRedirectResult',
      'signOut',
      'isSignIn',
      'fetchAuthState$',
    ]);
    service = new AuthService(authInfrastructureServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signInWithGooglePopup', () => {
    it('should call AuthInfrastructureService signInWithGooglePopup', () => {
      service.signInWithGooglePopup();
      expect(authInfrastructureServiceSpy.signInWithGooglePopup).toHaveBeenCalled();
    });
  });

  describe('signInWithGoogleRedirect', () => {
    it('should call AuthInfrastructureService signInWithGoogleRedirect', () => {
      service.signInWithGoogleRedirect();
      expect(authInfrastructureServiceSpy.signInWithGoogleRedirect).toHaveBeenCalled();
    });
  });

  describe('getRedirectResult', () => {
    it('should call AuthInfrastructureService getRedirectResult', () => {
      service.getRedirectResult();
      expect(authInfrastructureServiceSpy.getRedirectResult).toHaveBeenCalled();
    });

    it('should return a Promise of User | null', async () => {
      const userCredential: UserCredential | null = null;
      authInfrastructureServiceSpy.getRedirectResult.and.resolveTo(userCredential);

      const result = await service.getRedirectResult();

      expect(result).toBe(userCredential);
    });
  });

  describe('signOut', () => {
    it('should call AuthInfrastructureService signOut', () => {
      service.signOut();
      expect(authInfrastructureServiceSpy.signOut).toHaveBeenCalled();
    });
  });

  describe('isSignIn', () => {
    it('should call AuthInfrastructureService isSignIn', () => {
      service.isSignIn();

      expect(authInfrastructureServiceSpy.isSignIn).toHaveBeenCalled();
    });

    it('should return true', () => {
      authInfrastructureServiceSpy.isSignIn.and.returnValue(true);

      const isSignIn = service.isSignIn();

      expect(isSignIn).toBeTrue();
    });
  });

  describe('fetchAuthState$', () => {
    it('should call AuthInfrastructureService featureAuthState$', () => {
      service.fetchAuthState$();
      expect(authInfrastructureServiceSpy.fetchAuthState$).toHaveBeenCalled();
    });

    it('should return an Observable of User | null', () => {
      const user: User | null = null;
      authInfrastructureServiceSpy.fetchAuthState$.and.returnValue(of(user));

      service.fetchAuthState$().subscribe((result) => {
        expect(result).toEqual(user);
      });
    });
  });
});
