import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-component-sign-in-with-google-popup-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button
      class="btn btn-square btn-ghost flex flex-nowrap flex-row justify-start gap-x-2 w-full"
      (click)="signInWithGooglePopup()"
    >
      <fa-icon [icon]="faGoogle"></fa-icon>
      <span>{{ labelText }}</span>
    </button>
  `,
  styles: [],
})
export class SignInWithGooglePopupButtonComponent {
  @Input() labelText: string;

  faGoogle = faGoogle;

  constructor(private authService: AuthService) {
    this.labelText = 'Sign in with Google';
  }

  async signInWithGooglePopup(): Promise<void> {
    await this.authService.signInWithGooglePopup();
  }
}
