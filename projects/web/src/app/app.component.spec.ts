import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignInWithGooglePopupButtonComponent } from './components/buttons/sign-in-with-google-popup-button/sign-in-with-google-popup-button.component';
import { SignInWithGoogleRedirectButtonComponent } from './components/buttons/sign-in-with-google-redirect-button/sign-in-with-google-redirect-button.component';
import { SignOutButtonComponent } from './components/buttons/sign-out-button/sign-out-button.component';
import { createRandomAuthUser } from './services/auth/auth.mock';
import { of } from 'rxjs';
import { createRandomUser } from './services/user/user.mock';
import { By } from '@angular/platform-browser';

let authServiceSpy: jasmine.SpyObj<AuthService>;
let userServiceSpy: jasmine.SpyObj<UserService>;

const appComponentRenderHelper = async () => {
  return await render(AppComponent, {
    imports: [
      FontAwesomeModule,
      SignInWithGooglePopupButtonComponent,
      SignInWithGoogleRedirectButtonComponent,
      SignOutButtonComponent,
    ],
    providers: [
      { provide: AuthService, useValue: authServiceSpy },
      { provide: UserService, useValue: userServiceSpy },
    ],
  });
};

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['fetchAuthState$']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['fetchUser$']);
  });

  it('should create the app', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));

    // Act
    const { fixture } = await appComponentRenderHelper();
    component = fixture.componentInstance;

    // Assert
    expect(component).toBeTruthy();
  });

  it('should create the app when is not authenticated', async () => {
    // Arrange
    authServiceSpy.fetchAuthState$.and.returnValue(of(null));

    // Act
    const { fixture } = await appComponentRenderHelper();
    component = fixture.componentInstance;

    // Assert
    expect(component).toBeTruthy();
  });

  it(`should have as title 'web'`, async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));

    // Act
    const { fixture } = await appComponentRenderHelper();
    component = fixture.componentInstance;

    // Assert
    expect(component.title).toEqual('web');
  });

  it('should render signOut button when is authenticated', async () => {
    // Arrange
    const expectedAuthUser = createRandomAuthUser();
    const expectedUser = createRandomUser('google');
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedAuthUser));
    userServiceSpy.fetchUser$.and.returnValue(of(expectedUser));

    // Act
    const { fixture } = await appComponentRenderHelper();
    fixture.detectChanges();

    // Assert
    expect(screen.getByText('Sign out')).toBeTruthy();
  });

  it('should render signOut button when is not authenticated', async () => {
    // Arrange
    authServiceSpy.fetchAuthState$.and.returnValue(of(null));

    // Act
    const { fixture } = await appComponentRenderHelper();
    fixture.detectChanges();

    // Assert
    expect(screen.getAllByText('Sign in with Google')).toBeTruthy();
  });

  it('should render progress when is loading', async () => {
    // Arrange
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));
    userServiceSpy.fetchUser$.and.returnValue(of(null));

    // Act
    const { fixture, getByRole } = await appComponentRenderHelper();
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Assert
    const progressElement = getByRole('progressbar');
    expect(progressElement).toBeTruthy();
  });

  it('should render User when is authenticated ', async () => {
    // Arrange
    const expectedAuthUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedAuthUser));

    // Act
    const { fixture } = await appComponentRenderHelper();
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Assert
    expect(screen.getByText('User')).toBeTruthy();
  });
});
