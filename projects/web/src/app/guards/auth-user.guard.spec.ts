import { AuthUserGuard } from './auth-user.guard';
import { AuthService } from '../services/auth/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { createRandomAuthUser } from '../services/auth/auth.mock';

describe('AuthUserGuard', () => {
  let guard: AuthUserGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchAuthState$']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    guard = new AuthUserGuard(authServiceSpy, routerSpy);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to root if user is not authenticated', async () => {
    // Arrange
    authServiceSpy.fetchAuthState$.and.returnValue(of(null));
    const route = { paramMap: { get: () => 'test' } } as unknown as ActivatedRouteSnapshot;

    // Act
    const user$ = guard.canActivate(route) as Observable<boolean>;

    // Assert
    const subscription = user$.subscribe((user) => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(user).toBe(false);
    });
    subscription.unsubscribe;
  });

  it('should navigate to root if userId is not specified', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));
    const route = { paramMap: { get: () => null } } as unknown as ActivatedRouteSnapshot;

    // Act
    const user$ = guard.canActivate(route) as Observable<boolean>;

    // Assert
    const subscription = user$.subscribe((user) => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(user).toBe(false);
    });
    subscription.unsubscribe;
  });

  it('should navigate to root if userId does not match', () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));

    const route = { paramMap: { get: () => '123' } } as unknown as ActivatedRouteSnapshot;

    const user$ = guard.canActivate(route) as Observable<boolean>;

    const subscription = user$.subscribe((user) => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(user).toBe(false);
    });
    subscription.unsubscribe;
  });

  it('should stay if user is authenticated', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    const expectedUserId = expectedUser.uid;
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));
    const route = { paramMap: { get: () => expectedUserId } } as unknown as ActivatedRouteSnapshot;

    // Act
    const user$ = guard.canActivate(route) as Observable<boolean>;

    // Assert
    const subscription = user$.subscribe((user) => {
      expect(routerSpy.navigate).not.toHaveBeenCalled;
      expect(user).toBe(true);
    });
    subscription.unsubscribe;
  });
});
