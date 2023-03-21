import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHomeComponent } from '../../views/home/home.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, ViewHomeComponent],
  template: ` <app-view-home></app-view-home> `,
  styles: [],
})
export class HomeComponent {
  userCredential!: UserCredential | null;

  constructor(private authService: AuthService, private router: Router) {
    (async () => {
      this.userCredential = await this.authService.getRedirectResult();
      if (this.userCredential) {
        this.router.navigate(['users', this.userCredential.user?.uid]);
      }
    })();
  }
}
