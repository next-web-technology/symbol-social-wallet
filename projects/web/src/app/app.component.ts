import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterModule],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  title = 'web';
}
