import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Auth, authState, User } from '@angular/fire/auth';
import { AccountInfrastructureServiceInterface } from './account.service';
import { DocumentSnapshot, getDocs, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Account } from 'symbol-sdk';
import { getDoc, doc, CollectionReference, addDoc, docData, Firestore, collection } from '@angular/fire/firestore';
import { SymbolService } from '../blockchain/symbol.service';
import { converter } from '../../utils/firebase';
import { BaseUserAccount, NewUserAccount, UserAccount } from './account.type';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@Injectable({
  providedIn: 'root',
})
export class AccountInfrastructureService implements AccountInfrastructureServiceInterface {
  constructor(
    // private afs: AngularFirestore,
    private db: Firestore // private symbolService: SymbolService, // private route: ActivatedRoute
  ) {}

  async createNewAccount(account: Account, userId: string | null): Promise<UserAccount | undefined> {
    const baseAccount: BaseUserAccount = {
      blockchain: localStorage.getItem('blockchain'),
      address: account.address.plain(),
      publicKey: account.publicKey,
      privateKey: account.privateKey,
      networkType: 152,
    };

    const now = new Date();
    const newAccount: NewUserAccount = {
      ...baseAccount,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(
      collection(this.db, `/v/1/users/${userId}/accounts`).withConverter(converter<NewUserAccount>()),
      newAccount
    );
    console.log(docRef);
    const userAccount = (await getDoc(docRef.withConverter(converter<UserAccount>()))).data();

    return userAccount;
  }

  async createAccountFromPrivateKey(account: Account, userId: string | null): Promise<UserAccount | undefined> {
    const baseAccount: BaseUserAccount = {
      blockchain: localStorage.getItem('blockchain'),
      address: account.address.plain(),
      publicKey: account.publicKey,
      privateKey: account.privateKey,
      networkType: 152,
    };

    const now = new Date();
    const newAccount: NewUserAccount = {
      ...baseAccount,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(
      collection(this.db, `/v/1/users/${userId}/accounts`).withConverter(converter<NewUserAccount>()),
      newAccount
    );
    console.log(docRef);
    const userAccount = (await getDoc(docRef.withConverter(converter<UserAccount>()))).data();

    return userAccount;
  }

  async fetchAccounts(userId: string | null): Promise<QueryDocumentSnapshot<UserAccount>[]> {
    const colRef = collection(this.db, `/v/1/users/${userId}/accounts`);
    const accounts = (await getDocs(colRef.withConverter(converter<UserAccount>()))).docs;

    return accounts;
  }

  async fetchAccount(userId: string | null, accountId: string | null): Promise<DocumentSnapshot<UserAccount>> {
    const docRef = doc(this.db, `/v/1/users/${userId}/accounts/${accountId}`);
    const account = await getDoc(docRef.withConverter(converter<UserAccount>()));

    return account;
  }

  // fetchAccount$(userId: string | null): Observable<UserAccount | null | undefined> {
  //   return docData(doc(this.db, `/v/1/users/${userId}`).withConverter(converter<User>())).pipe(
  //     catchError((error) => {
  //       console.error(error);
  //       return of(undefined);
  //     })
  //   );
  // }

  // async fetchUser(id: string): Promise<User | undefined> {
  //   return (await getDoc(doc(this.db, `/v/1/users/${id}`).withConverter(converter<User>()))).data();
  // }

  // async updateUser(baseUserUpdate: BaseUserUpdate): Promise<User | undefined> {
  //   assertIsBaseUserUpdate(baseUserUpdate);
  //   const now = new Date();
  //   const userUpdate: UserUpdate = {
  //     ...baseUserUpdate,
  //     updatedAt: now,
  //   };
  //   assertIsUserUpdate(userUpdate);
  //   await updateDoc(doc(this.db, `/v/1/users/${userUpdate.id}`).withConverter(converter<UserUpdate>()), userUpdate);
  //   return await this.fetchUser(userUpdate.id);
  // }

  // async deleteUser(id: string): Promise<{ id: string } | undefined> {
  //   try {
  //     await deleteDoc(doc(this.db, `/v/1/users/${id}`).withConverter(converter<User>()));
  //     return { id };
  //   } catch (error) {
  //     console.error(error);
  //     return undefined;
  //   }
  // }
}
