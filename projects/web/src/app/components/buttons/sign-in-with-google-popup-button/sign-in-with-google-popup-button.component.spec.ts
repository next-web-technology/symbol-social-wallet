import { ComponentFixture } from '@angular/core/testing';
import { AuthService } from '../../../services/auth/auth.service';
import { SignInWithGooglePopupButtonComponent } from './sign-in-with-google-popup-button.component';
import { render, screen, RenderResult, fireEvent } from '@testing-library/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('SignInWithGooglePopupButtonComponent', () => {
  let renderResult: RenderResult<SignInWithGooglePopupButtonComponent>;
  let fixture: ComponentFixture<SignInWithGooglePopupButtonComponent>;
  let component: SignInWithGooglePopupButtonComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signInWithGooglePopup']);

    renderResult = await render(SignInWithGooglePopupButtonComponent, {
      imports: [FontAwesomeModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      componentProperties: { labelText: 'Sign in with Google' },
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
    const button = renderResult.getByText('Sign in with Google');

    // Act
    await fireEvent.click(button);

    // Assert
    expect(authServiceSpy.signInWithGooglePopup).toHaveBeenCalled();
  });
});
