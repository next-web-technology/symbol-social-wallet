import { faker } from '@faker-js/faker';
import { BaseUser, BaseUserUpdate, NewUser, User, UserUpdate } from './user.type';

faker.setLocale('ja');

export const createRandomBaseUser = (provider: string): BaseUser => {
  const baseUser: BaseUser = {
    name: faker.name.fullName(),
    photoUrl: faker.image.imageUrl(),
    bio: faker.lorem.paragraph(),
    provider: '',
    google: '',
    twitter: '',
    github: '',
  };
  switch (provider) {
    case 'google':
      baseUser.provider = 'google';
      baseUser.google = faker.internet.email();
      return baseUser;
    case 'twitter':
      baseUser.provider = 'twitter';
      baseUser.twitter = faker.internet.userName();
      return baseUser;
    case 'github':
      baseUser.provider = 'github';
      baseUser.github = faker.internet.userName();
      return baseUser;
    default:
      throw Error('Invalid provider: ' + provider);
  }
};

export const convertBaseUserToNewUser = (baseUser: BaseUser): NewUser => {
  return {
    ...baseUser,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};

export const createRandomNewUser = (provider: string): NewUser => {
  const baseUser = createRandomBaseUser(provider);
  return convertBaseUserToNewUser(baseUser);
};

export const convertBaseUserToUser = (baseUser: BaseUser): User => {
  return {
    id: faker.datatype.uuid(),
    ...baseUser,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
};

export const createRandomUser = (provider: string): User => {
  const newUser = createRandomNewUser(provider);
  return {
    id: faker.datatype.uuid(),
    ...newUser,
  };
};

export const convertUserToBaseUserUpdate = (user: User): BaseUserUpdate => {
  return {
    id: user.id,
    name: user.name,
    photoUrl: user.photoUrl,
    bio: user.bio,
  };
};

export const createRandomBaseUserUpdate = (provider: string): BaseUserUpdate => {
  const user = createRandomUser(provider);
  return convertUserToBaseUserUpdate(user);
};
