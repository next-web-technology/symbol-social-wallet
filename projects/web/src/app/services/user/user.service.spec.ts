import { of } from 'rxjs';
import { UserInfrastructureService } from './user-infrastructure.service';
import {
  convertBaseUserToUser,
  convertUserToBaseUserUpdate,
  createRandomBaseUser,
  createRandomBaseUserUpdate,
  createRandomUser,
} from './user.mock';
import { UserService } from './user.service';
import { BaseUser, BaseUserUpdate, User } from './user.type';

describe('UserService', () => {
  let service: UserService;
  let userInfrastructureServiceSpy: jasmine.SpyObj<UserInfrastructureService>;

  beforeEach(async () => {
    userInfrastructureServiceSpy = jasmine.createSpyObj('UserInfrastructureService', [
      'createUser',
      'fetchUser$',
      'fetchUser',
      'updateUser',
      'deleteUser',
    ]);
    service = new UserService(userInfrastructureServiceSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createUser', () => {
    it('should call UserInfrastructureService createUser', () => {
      // Arrange
      const baseUser: BaseUser = createRandomBaseUser('google');
      userInfrastructureServiceSpy.createUser.and.returnValue(Promise.resolve(convertBaseUserToUser(baseUser)));

      // Act
      service.createUser(baseUser);

      // Assertion
      expect(userInfrastructureServiceSpy.createUser).toHaveBeenCalledOnceWith(baseUser);
    });

    it('should return google User with google BaseUser', async () => {
      // Arrange
      const baseUser: BaseUser = createRandomBaseUser('google');
      const expectedUser: User = convertBaseUserToUser(baseUser);
      userInfrastructureServiceSpy.createUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.createUser(baseUser);

      // Assertion
      expect(user).toEqual(expectedUser);
    });

    it('should return twitter User with twitter BaseUser', async () => {
      // Arrange
      const baseUser: BaseUser = createRandomBaseUser('twitter');
      const expectedUser: User = convertBaseUserToUser(baseUser);
      userInfrastructureServiceSpy.createUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.createUser(baseUser);

      // Assertion
      expect(user).toEqual(expectedUser);
    });

    it('should return github User with github BaseUser', async () => {
      // Arrange
      const baseUser: BaseUser = createRandomBaseUser('github');
      const expectedUser: User = convertBaseUserToUser(baseUser);
      userInfrastructureServiceSpy.createUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.createUser(baseUser);

      // Assertion
      expect(user).toEqual(expectedUser);
    });
  });

  describe('fetchUser$', () => {
    it('should call UserInfrastructureService fetchUser$', () => {
      // Arrange

      // Act
      service.fetchUser$('dummyUserId');

      // Assertion
      expect(userInfrastructureServiceSpy.fetchUser$).toHaveBeenCalledOnceWith('dummyUserId');
    });

    it('should return Observable google User with google User id', () => {
      // Arrange
      const expectedUser: User = createRandomUser('google');
      const userId: string = expectedUser.id;
      userInfrastructureServiceSpy.fetchUser$.and.returnValue(of(expectedUser));

      // Act
      const user$ = service.fetchUser$(userId);

      // Assertion
      const subscription = user$.subscribe((user) => {
        expect(user).toEqual(expectedUser);
      });
      subscription.unsubscribe;
    });

    it('should return Observable twitter User with twitter User id', () => {
      // Arrange
      const expectedUser: User = createRandomUser('twitter');
      const userId: string = expectedUser.id;
      userInfrastructureServiceSpy.fetchUser$.and.returnValue(of(expectedUser));

      // Act
      const user$ = service.fetchUser$(userId);

      // Assertion
      const subscription = user$.subscribe((user) => {
        expect(user).toEqual(expectedUser);
      });
      subscription.unsubscribe;
    });

    it('should return Observable github User with github User id', () => {
      // Arrange
      const expectedUser: User = createRandomUser('github');
      const userId: string = expectedUser.id;
      userInfrastructureServiceSpy.fetchUser$.and.returnValue(of(expectedUser));

      // Act
      const user$ = service.fetchUser$(userId);

      // Assertion
      const subscription = user$.subscribe((user) => {
        expect(user).toEqual(expectedUser);
      });
      subscription.unsubscribe;
    });
  });

  describe('fetchUser', () => {
    it('fetchUser should call UserInfrastructureService fetchUser', () => {
      // Arrange

      // Act
      service.fetchUser('dummyUserId');

      // Assertion
      expect(userInfrastructureServiceSpy.fetchUser).toHaveBeenCalledOnceWith('dummyUserId');
    });

    it('fetchUser should return google Promise User with google User id', async () => {
      // Arrange
      const expectedUser: User = createRandomUser('google');
      const userId: string = expectedUser.id;
      userInfrastructureServiceSpy.fetchUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.fetchUser(userId);

      // Assertion
      expect(user).toEqual(expectedUser);
    });

    it('fetchUser should return twitter Promise User with twitter User id', async () => {
      // Arrange
      const expectedUser: User = createRandomUser('twitter');
      const userId: string = expectedUser.id;
      userInfrastructureServiceSpy.fetchUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.fetchUser(userId);

      // Assertion
      expect(user).toEqual(expectedUser);
    });

    it('fetchUser should return github Promise User with github User id', async () => {
      // Arrange
      const expectedUser: User = createRandomUser('google');
      const userId: string = expectedUser.id;
      userInfrastructureServiceSpy.fetchUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.fetchUser(userId);

      // Assertion
      expect(user).toEqual(expectedUser);
    });
  });

  describe('updateUser', () => {
    it('should call UserInfrastructureService updateUser', () => {
      // Arrange
      const baseUserUpdate: BaseUserUpdate = createRandomBaseUserUpdate('google');

      // Act
      service.updateUser(baseUserUpdate);

      // Assertion
      expect(userInfrastructureServiceSpy.updateUser).toHaveBeenCalledOnceWith(baseUserUpdate);
    });

    it('should return google User with google BaseUserUpdate', async () => {
      // Arrange
      const expectedUser: User = createRandomUser('google');
      const baseUserUpdate: BaseUserUpdate = convertUserToBaseUserUpdate(expectedUser);
      userInfrastructureServiceSpy.updateUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.updateUser(baseUserUpdate);

      // Assertion
      expect(user).toEqual(expectedUser);
    });

    it('should return twitter User with twitter BaseUserUpdate', async () => {
      // Arrange
      const expectedUser: User = createRandomUser('twitter');
      const baseUserUpdate: BaseUserUpdate = convertUserToBaseUserUpdate(expectedUser);
      userInfrastructureServiceSpy.updateUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.updateUser(baseUserUpdate);

      // Assertion
      expect(user).toEqual(expectedUser);
    });

    it('should return github User with github BaseUserUpdate', async () => {
      // Arrange
      const expectedUser: User = createRandomUser('github');
      const baseUserUpdate: BaseUserUpdate = convertUserToBaseUserUpdate(expectedUser);
      userInfrastructureServiceSpy.updateUser.and.returnValue(Promise.resolve(expectedUser));

      // Act
      const user = await service.updateUser(baseUserUpdate);

      // Assertion
      expect(user).toEqual(expectedUser);
    });
  });
});
