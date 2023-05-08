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
    <li>
      <a class="btn btn-ghost flex flex-row justify-start" (click)="signOut()">
        <fa-icon [icon]="faRightFromBracket"></fa-icon>
        <span>SIGN OUT</span>
      </a>
    </li>
  `,
  styles: [],
})
export class SignOutButtonComponent {
  faRightFromBracket = faRightFromBracket;

  constructor(private authService: AuthService, private router: Router) {}

  async signOut(): Promise<void> {
    const subscription = this.authService.fetchAuthState$().subscribe((authUser) => {
      if (authUser === null) {
        this.router.navigate(['/auth/sign-in']);
        subscription.unsubscribe();
      }
    });
    await this.authService.signOut();
  }
}
