import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCredential, User } from '@angular/fire/auth';
import { AuthInfrastructureService } from './auth-infrastructure.service';

export interface AuthInfrastructureServiceInterface {
  signInWithGooglePopup: () => Promise<void>;
  signInWithGoogleRedirect: () => Promise<void>;
  getRedirectResult: () => Promise<UserCredential | null>;
  signOut: () => Promise<void>;
  isSignIn: () => boolean;
  fetchAuthState$: () => Observable<User | null>;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authInfrastructureServiceInterface: AuthInfrastructureServiceInterface;

  constructor(authInfrastructureService: AuthInfrastructureService) {
    this.authInfrastructureServiceInterface = authInfrastructureService;
  }

  async signInWithGooglePopup(): Promise<void> {
    return this.authInfrastructureServiceInterface.signInWithGooglePopup();
  }

  async signInWithGoogleRedirect(): Promise<void> {
    return this.authInfrastructureServiceInterface.signInWithGoogleRedirect();
  }

  async getRedirectResult(): Promise<UserCredential | null> {
    return this.authInfrastructureServiceInterface.getRedirectResult();
  }

  async signOut(): Promise<void> {
    return this.authInfrastructureServiceInterface.signOut();
  }

  isSignIn(): boolean {
    return this.authInfrastructureServiceInterface.isSignIn();
  }

  fetchAuthState$(): Observable<User | null> {
    return this.authInfrastructureServiceInterface.fetchAuthState$();
  }
}
