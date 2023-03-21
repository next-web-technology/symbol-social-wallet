import { HomeComponent } from './home.component';
import { render } from '@testing-library/angular';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from 'firebase/auth';

let authServiceSpy: jasmine.SpyObj<AuthService>;
let routerSpy: jasmine.SpyObj<Router>;
const homeComponentRenderHelper = async () => {
  return await render(HomeComponent, {
    providers: [
      { provide: AuthService, useValue: authServiceSpy },
      { provide: Router, useValue: routerSpy },
    ],
  });
};

describe('PageHomeComponent', () => {
  let component: HomeComponent;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getRedirectResult']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  it('should create', async () => {
    // Arrange
    const { fixture } = await homeComponentRenderHelper();

    // Act
    component = fixture.componentInstance;

    // Assert
    expect(component).toBeTruthy();
  });

  it('should navigate to user page if user credential exists', async () => {
    // Arrange
    authServiceSpy.getRedirectResult.and.returnValue(
      Promise.resolve({
        user: {
          uid: '123',
        },
      } as UserCredential)
    );

    // Act
    await homeComponentRenderHelper();

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users', '123']);
  });

  it('should not navigate if user credential is null', async () => {
    // Arrange
    authServiceSpy.getRedirectResult.and.returnValue(Promise.resolve(null));

    // Act
    await homeComponentRenderHelper();

    // Assert
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
