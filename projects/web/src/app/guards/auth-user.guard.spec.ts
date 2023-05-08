import { AuthUserGuard } from './auth-user.guard';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { of, Observable } from 'rxjs';
import { createRandomAuthUser } from '../services/auth/auth.mock';

describe('AuthUserGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let guard: AuthUserGuard;
  let route: ActivatedRouteSnapshot;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchAuthState$']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    guard = new AuthUserGuard(authServiceSpy, routerSpy);
    route = new ActivatedRouteSnapshot();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to sign in page if user is not authenticated', async () => {
    // Arrange
    authServiceSpy.fetchAuthState$.and.returnValue(of(null));

    // Act
    guard.canActivate(route).subscribe((user) => {
      // Assert
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
      expect(user).toBe(false);
    });
  });

  it('should navigate to root if userId is not specified', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));
    route.params = { userId: null };

    // Act
    guard.canActivate(route).subscribe((user) => {
      // Assert
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(user).toBe(false);
    });
  });

  it('should navigate to root if uid of use and userId do not match', () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));
    route.params = { userId: 'test' };

    // Act
    guard.canActivate(route).subscribe((user) => {
      // Assert
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(user).toBe(false);
    });
  });

  it('should stay if user is authenticated', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));
    route.params = { userId: expectedUser.uid };

    // Act
    guard.canActivate(route).subscribe((user) => {
      // Assert
      expect(routerSpy.navigate).not.toHaveBeenCalled;
      expect(user).toBe(true);
    });
  });
});
