import { ComponentFixture } from '@angular/core/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { render, screen, RenderResult, fireEvent } from '@testing-library/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignOutButtonComponent } from './sign-out-button.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { createRandomAuthUser } from '../../../services/auth/auth.mock';

describe('SignOutButtonComponent', () => {
  let renderResult: RenderResult<SignOutButtonComponent>;
  let fixture: ComponentFixture<SignOutButtonComponent>;
  let component: SignOutButtonComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signOut', 'fetchAuthState$']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    renderResult = await render(SignOutButtonComponent, {
      imports: [FontAwesomeModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      componentProperties: { labelText: 'Sign out' },
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label text', () => {
    // Arrange
    const labelText = 'test';
    component.labelText = labelText;

    // Act
    fixture.autoDetectChanges();

    // Assert
    expect(screen.getByText(labelText)).toBeTruthy();
  });

  it('should call signOut method when the button is clicked', async () => {
    // Arrange
    const button = renderResult.getByText('Sign out');
    const expectedUser = createRandomAuthUser();
    authServiceSpy.fetchAuthState$.and.returnValue(of(expectedUser));

    // Act
    await fireEvent.click(button);

    // Assert
    expect(authServiceSpy.signOut).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to route when authUser is null', async () => {
    // Arrange
    const button = renderResult.getByText('Sign out');
    authServiceSpy.fetchAuthState$.and.returnValue(of(null));

    // Act
    await fireEvent.click(button);

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
