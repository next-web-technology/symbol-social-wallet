import { AuthService } from './auth.service';
import { AuthInfrastructureService } from './auth-infrastructure.service';
import { of } from 'rxjs';
import { createRandomAuthUserCredential, createRandomAuthUser } from './auth.mock';

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
      // Act
      service.signInWithGooglePopup();

      // Assert
      expect(authInfrastructureServiceSpy.signInWithGooglePopup).toHaveBeenCalled();
    });
  });

  describe('signInWithGoogleRedirect', () => {
    it('should call AuthInfrastructureService signInWithGoogleRedirect', () => {
      // Act
      service.signInWithGoogleRedirect();

      // Asssert
      expect(authInfrastructureServiceSpy.signInWithGoogleRedirect).toHaveBeenCalled();
    });
  });

  describe('getRedirectResult', () => {
    it('should call AuthInfrastructureService getRedirectResult', () => {
      // Act
      service.getRedirectResult();

      // Assert
      expect(authInfrastructureServiceSpy.getRedirectResult).toHaveBeenCalled();
    });

    it('should return a Promise of UserCredential | null', async () => {
      // Arrange
      const expectedUserCredential = createRandomAuthUserCredential();
      authInfrastructureServiceSpy.getRedirectResult.and.returnValue(Promise.resolve(expectedUserCredential));

      // Act
      const result = await service.getRedirectResult();

      // Assert
      expect(result).toEqual(expectedUserCredential);
    });

    it('should return a Promise of null', async () => {
      // Arrange
      authInfrastructureServiceSpy.getRedirectResult.and.returnValue(Promise.resolve(null));

      // Act
      const result = await service.getRedirectResult();

      // Assert
      expect(result).toBeNull;
    });
  });

  describe('signOut', () => {
    it('should call AuthInfrastructureService signOut', () => {
      // Act
      service.signOut();

      // Assert
      expect(authInfrastructureServiceSpy.signOut).toHaveBeenCalled();
    });
  });

  describe('isSignIn', () => {
    it('should call AuthInfrastructureService isSignIn', () => {
      // Act
      service.isSignIn();

      // Assert
      expect(authInfrastructureServiceSpy.isSignIn).toHaveBeenCalled();
    });

    it('should return true', () => {
      // Arrange
      authInfrastructureServiceSpy.isSignIn.and.returnValue(true);

      // Act
      const isSignIn = service.isSignIn();

      // Assert
      expect(isSignIn).toBeTrue();
    });
  });

  describe('fetchAuthState$', () => {
    it('should call AuthInfrastructureService featureAuthState$', () => {
      // Act
      service.fetchAuthState$();

      // Assert
      expect(authInfrastructureServiceSpy.fetchAuthState$).toHaveBeenCalled();
    });

    it('should return an Observable of User', () => {
      // Arrange
      const expectedUser = createRandomAuthUser();
      authInfrastructureServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));

      // Act
      const result$ = service.fetchAuthState$();

      // Assert
      const subscription = result$.subscribe((result) => {
        expect(result).toEqual(expectedUser);
      });
      subscription.unsubscribe;
    });

    it('should return an Observable of null', () => {
      // Arrange
      authInfrastructureServiceSpy.fetchAuthState$.and.returnValue(of(null));

      // Act
      const auth$ = service.fetchAuthState$();

      // Assert
      const subscription = auth$.subscribe((result) => {
        expect(result).toBeNull;
      });
      subscription.unsubscribe;
    });
  });
});
