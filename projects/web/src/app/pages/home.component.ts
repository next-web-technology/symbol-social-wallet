import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/layouts/sidebar/sidebar.component';
import { ViewHomeComponent } from '../views/home.component';

@Component({
  selector: 'app-page-home',
  standalone: true,
  providers: [],
  imports: [CommonModule, RouterModule, RouterLink, FontAwesomeModule, ViewHomeComponent, SidebarComponent],
  template: `
    <div class="drawer drawer-mobile" data-theme="light">
      <!-- hidden element -->
      <input id="app-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- progress bar -->
        <!-- not working? -->
        <!-- <ng-container *ngIf="loading$ | async as loading">
          <progress class="progress w-full"></progress>
        </ng-container> -->
        <!-- page content -->
        <div class="container mx-auto my-10">
          <router-outlet></router-outlet>
          <app-view-home *ngIf="isHome"></app-view-home>
        </div>
      </div>
      <!-- side bar -->
      <app-component-layout-sidebar class="drawer-side"></app-component-layout-sidebar>
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  faBars = faBars;
  faUser = faUser;
  faHome = faHome;
  isHome = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getIsHome(event.url);
      }
    });
  }

  getIsHome(url: string) {
    this.isHome = url == '/' ? true : false;
  }
}
