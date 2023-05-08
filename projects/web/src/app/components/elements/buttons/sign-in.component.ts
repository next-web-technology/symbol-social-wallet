import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components-elements-buttons-sign-in',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <a
      *ngIf="social === 'Google'; else Twitter"
      class="mb-3 flex w-full items-center justify-center rounded px-7 pb-2.5 pt-3 text-center text-sm font-large text-white btn btn-outline btn-info"
      role="button"
      (click)="signInWithGooglePopup()"
    >
      <fa-icon [icon]="faGoogle"></fa-icon>
      <p class="ml-3">{{ labelText }}</p>
    </a>
    <ng-template #Twitter>
      <a
        class="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        style="background-color: #3b5998"
        role="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        (click)="signInWithGooglePopup()"
      >
        <fa-icon [icon]="faGoogle"></fa-icon>
        <p>{{ labelText }}</p>
      </a>
    </ng-template>
  `,
  styles: [],
})
export class SignInButtonComponent {
  @Input() social = 'Google';
  labelText: string;

  faGoogle = faGoogle;

  constructor(private authService: AuthService, private router: Router) {
    this.labelText = 'Continue with ' + this.social;
  }

  async signInWithGooglePopup(): Promise<void> {
    await this.authService.signInWithGooglePopup().then(() => {
      this.router.navigate(['/']);
    });
  }
}
