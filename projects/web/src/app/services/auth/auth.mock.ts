import { faker } from '@faker-js/faker';
import { IdTokenResult, UserCredential } from 'firebase/auth';
import { UserInfo, User } from 'firebase/auth';

faker.setLocale('ja');

export const createRandomUserInfo = (): UserInfo => {
  return {
    displayName: faker.name.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    photoURL: faker.image.imageUrl(),
    providerId: faker.random.word(),
    uid: faker.datatype.uuid(),
  };
};

export const createRandomUser = (): User => {
  return {
    displayName: faker.name.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    photoURL: faker.image.imageUrl(),
    providerId: faker.random.word(),
    uid: faker.datatype.uuid(),
    emailVerified: faker.datatype.boolean(),
    isAnonymous: faker.datatype.boolean(),
    metadata: {
      creationTime: faker.date.past().toString(),
      lastSignInTime: faker.date.past().toString(),
    },
    providerData: [createRandomUserInfo(), createRandomUserInfo()],
    refreshToken: faker.random.word(),
    tenantId: faker.random.word(),
    delete: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    getIdToken: function (): Promise<string> {
      throw new Error('Function not implemented.');
    },
    getIdTokenResult: function (): Promise<IdTokenResult> {
      throw new Error('Function not implemented.');
    },
    reload: function (): Promise<void> {
      throw new Error('Function not implemented.');
    },
    toJSON: function (): object {
      throw new Error('Function not implemented.');
    },
  };
};

export const createRandomUserCredential = (): UserCredential => {
  return {
    user: createRandomUser(),
    providerId: faker.random.word(),
    operationType: 'signIn',
  };
};
