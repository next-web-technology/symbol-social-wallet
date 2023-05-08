import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.fetchAuthState$().pipe(
      tap((user) => {
        if (!user) {
          this.router.navigate(['/auth/sign-in']);
        }
      }),
      map((user) => !!user)
    );
  }
}
