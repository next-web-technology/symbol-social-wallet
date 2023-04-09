import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult as firebaseGetRedirectResult,
  signOut as firebaseSignOut,
  authState,
  UserCredential,
  User,
} from '@angular/fire/auth';
import { AuthInfrastructureServiceInterface } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInfrastructureService implements AuthInfrastructureServiceInterface {
  constructor(private afAuth: Auth) {}

  async signInWithGooglePopup(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.afAuth, provider);
  }

  async signInWithGoogleRedirect(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(this.afAuth, provider);
  }

  async getRedirectResult(): Promise<UserCredential | null> {
    return await firebaseGetRedirectResult(this.afAuth).then((userCredential) => {
      return userCredential;
    });
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(this.afAuth);
  }

  isSignIn(): boolean {
    const currentUser = this.afAuth.currentUser;
    return currentUser !== null;
  }

  fetchAuthState$(): Observable<User | null> {
    return authState(this.afAuth).pipe(
      tap((user) => {
        if (!user) {
          return;
        }
      }),
      map((user) => user)
    );
  }
}
