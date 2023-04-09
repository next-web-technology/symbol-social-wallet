import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { createRandomAuthUser } from '../services/auth/auth.mock';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchAuthState$']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    guard = new AuthGuard(authServiceSpy, routerSpy);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should navigate to root if user is not authenticated', async () => {
    // Arrange
    authServiceSpy.fetchAuthState$.and.returnValue(of(null));

    // Act
    const user$ = guard.canActivate() as Observable<boolean>;

    // Assert
    const subscription = user$.subscribe((user) => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
      expect(user).toBe(false);
    });
    subscription.unsubscribe;
  });

  it('should stay if user is authenticated', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));

    // Act
    const user$ = guard.canActivate() as Observable<boolean>;

    // Assert
    const subscription = user$.subscribe((user) => {
      expect(routerSpy.navigate).not.toHaveBeenCalled;
      expect(user).toBe(true);
    });
    subscription.unsubscribe;
  });
});
