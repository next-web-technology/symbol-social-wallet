import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-sign-out-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button class="btn btn-square btn-ghost flex flex-row justify-start gap-2 w-full" (click)="signOut()">
      <fa-icon [icon]="faRightFromBracket"></fa-icon>
      <span>{{ labelText }}</span>
    </button>
  `,
  styles: [],
})
export class SignOutButtonComponent {
  @Input() labelText: string;

  faRightFromBracket = faRightFromBracket;

  constructor(private authService: AuthService, private router: Router) {
    this.labelText = 'Sign out';
  }

  async signOut(): Promise<void> {
    const subscription = this.authService.fetchAuthState$().subscribe((authUser) => {
      if (authUser === null) {
        this.router.navigate(['/']);
        subscription.unsubscribe();
      }
    });
    await this.authService.signOut();
  }
}
