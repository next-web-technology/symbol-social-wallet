import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfrastructureService } from './user-infrastructure.service';
import { BaseUser, BaseUserUpdate, User } from './user.type';

export interface UserInfrastructureServiceInterface {
  createUser: (baseUser: BaseUser) => Promise<User | undefined>;
  fetchUser$: (id: string) => Observable<User | null | undefined>;
  fetchUser: (id: string) => Promise<User | undefined>;
  updateUser: (baseUserUpdate: BaseUserUpdate) => Promise<User | undefined>;
  deleteUser: (id: string) => Promise<{ id: string } | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfrastructureServiceInterface: UserInfrastructureServiceInterface;

  constructor(userInfrastructureService: UserInfrastructureService) {
    this.userInfrastructureServiceInterface = userInfrastructureService;
  }

  async createUser(baseUser: BaseUser): Promise<User | undefined> {
    return this.userInfrastructureServiceInterface.createUser(baseUser);
  }

  fetchUser$(id: string): Observable<User | null | undefined> {
    return this.userInfrastructureServiceInterface.fetchUser$(id);
  }

  async fetchUser(id: string): Promise<User | undefined> {
    return this.userInfrastructureServiceInterface.fetchUser(id);
  }

  async updateUser(baseUserUpdate: BaseUserUpdate): Promise<User | undefined> {
    return this.userInfrastructureServiceInterface.updateUser(baseUserUpdate);
  }

  async deleteUser(id: string): Promise<{ id: string } | undefined> {
    return this.userInfrastructureServiceInterface.deleteUser(id);
  }
}
