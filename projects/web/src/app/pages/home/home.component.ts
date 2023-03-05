import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHomeComponent } from '../../views/home/home.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, ViewHomeComponent],
  template: `
    <p>home works!</p>
    <app-view-home></app-view-home>
  `,
  styles: [],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getRedirectResult().then((userCredential) => {
      if (userCredential) {
        this.router.navigate(['users', userCredential.user?.uid]);
        // this.router.navigate(['users'], { queryParams: { userId: 'userCredential.user?.uid' }});
      }
    });
  }
}
