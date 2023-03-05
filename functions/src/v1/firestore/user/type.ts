export type BaseUser = {
  name: string;
  photoUrl: string;
  bio: string;
  provider: string;
  google: string;
  twitter: string;
  github: string;
};

export type NewUser = {
  createdAt: Date;
  updatedAt: Date;
} & BaseUser;

export type User = {
  id: string;
} & NewUser;

type UpdateRestrictedKeys = 'provider' | 'google' | 'twitter' | 'github' | 'createdAt' | 'updatedAt';

export type BaseUserUpdate = Pick<User, 'id'> & Partial<Omit<User, UpdateRestrictedKeys>>;

export type UserUpdate = {
  updatedAt: Date;
} & BaseUserUpdate;
