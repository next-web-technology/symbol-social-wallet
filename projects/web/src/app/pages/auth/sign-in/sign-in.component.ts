import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSignInComponent } from '../../../views/auth/sign-in/sign-in.component';

@Component({
  selector: 'app-page-sign-in',
  standalone: true,
  imports: [CommonModule, ViewSignInComponent],
  providers: [],
  template: ` <app-view-sign-in></app-view-sign-in> `,
  styles: [],
})
export class SignInComponent {}
