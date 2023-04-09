import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';
import { environment } from './environments/environment';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      provideAuth(() => {
        const auth = getAuth(getApp());
        if (environment.useEmulators) {
          connectAuthEmulator(auth, 'http://localhost:9099');
        }
        return auth;
      }),
      provideFirestore(() => {
        let firestore: Firestore;
        if (environment.useEmulators) {
          firestore = initializeFirestore(getApp(), {
            experimentalForceLongPolling: true,
          });
          connectFirestoreEmulator(firestore, 'localhost', 8080);
        } else {
          firestore = getFirestore(getApp());
        }
        return firestore;
      }),
      provideStorage(() => {
        const storage = getStorage(getApp());
        if (environment.useEmulators) {
          connectStorageEmulator(storage, 'localhost', 9199);
        }
        return storage;
      }),
      provideFunctions(() => {
        const functions = getFunctions(getApp());
        if (environment.useEmulators) {
          connectFunctionsEmulator(functions, 'localhost', 5001);
        }
        return functions;
      })
    ),
  ],
});
