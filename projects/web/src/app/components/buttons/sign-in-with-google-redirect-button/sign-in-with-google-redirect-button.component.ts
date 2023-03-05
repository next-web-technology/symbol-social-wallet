import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-component-sign-in-with-google-redirect-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button
      class="btn btn-square btn-ghost flex flex-nowrap flex-row justify-start gap-x-2 w-full text-left"
      (click)="signInWithGoogleRedirect()"
    >
      <fa-icon [icon]="faGoogle"></fa-icon>
      <span>{{ labelText }}</span>
    </button>
  `,
  styles: [],
})
export class SignInWithGoogleRedirectButtonComponent {
  @Input() labelText: string;

  faGoogle = faGoogle;

  constructor(private authService: AuthService) {
    this.labelText = 'Sign in with Google';
  }

  async signInWithGoogleRedirect(): Promise<void> {
    await this.authService.signInWithGoogleRedirect();
  }
}
