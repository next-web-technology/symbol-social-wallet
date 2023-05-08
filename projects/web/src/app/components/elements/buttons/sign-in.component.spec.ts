import { ComponentFixture } from '@angular/core/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { SignInButtonComponent } from './sign-in.component';
import { render, screen, RenderResult, fireEvent } from '@testing-library/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('SignInButtonComponent', () => {
  let renderResult: RenderResult<SignInButtonComponent>;
  let fixture: ComponentFixture<SignInButtonComponent>;
  let component: SignInButtonComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signInWithGooglePopup']);

    renderResult = await render(SignInButtonComponent, {
      imports: [FontAwesomeModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      // componentProperties: { labelText: 'Sign in with Google' },
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

  it('should call signInWithGooglePopup method when the button is clicked', async () => {
    // Arrange
    const button = renderResult.getByText('Continue with Google');

    // Act
    await fireEvent.click(button);

    // Assert
    expect(authServiceSpy.signInWithGooglePopup).toHaveBeenCalled();
  });
});
