import { DocumentSnapshot } from 'firebase-functions/lib/v1/providers/firestore';
import { db } from '../../../utils/firebase';
import { converter } from '../../../utils/firebase/converter';
import { firestorePath } from '../path';
import { BaseUser, NewUser, User, BaseUserUpdate, UserUpdate } from './type';
import {
  assertIsBaseUser,
  assertIsNewUser,
  assertIsUser,
  assertIsBaseUserUpdate,
  assertIsUserUpdate,
} from '../type.predicates';

export { BaseUser, NewUser, User, BaseUserUpdate, UserUpdate } from './type';

export type Users = User[];

const userConverter = converter<User>();
const newUserConverter = converter<NewUser>();
const userUpdateConverter = converter<UserUpdate>();

const usersCollectionRef = () => db.collection(firestorePath.v1.users.path.collection).withConverter(userConverter);
const newUsersCollectionRef = () =>
  db.collection(firestorePath.v1.users.path.collection).withConverter(newUserConverter);

const userDocRef = (userId: string) => db.doc(firestorePath.v1.users.path.doc(userId)).withConverter(userConverter);
const userUpdateDocRef = (userId: string) =>
  db.doc(firestorePath.v1.users.path.doc(userId)).withConverter(userUpdateConverter);

export const getUser = async (userId: string): Promise<User | undefined> => {
  return (await userDocRef(userId).get()).data();
};

export const addUser = async (baseUser: BaseUser): Promise<User | undefined> => {
  assertIsBaseUser(baseUser);
  const now = new Date();
  const newUser: NewUser = {
    ...baseUser,
    createdAt: now,
    updatedAt: now,
  };
  assertIsNewUser(newUser);
  const docRef = await newUsersCollectionRef().add(newUser);
  const id = docRef.id;
  const user = await getUser(id);
  if (user === undefined) {
    return user;
  }
  assertIsUser(user);
  return user;
};

export const setUser = async (user: User): Promise<User | undefined> => {
  assertIsUser(user);
  await userDocRef(user.id).set(user, { merge: true });
  const fetchedUser = await getUser(user.id);
  if (fetchedUser === undefined) {
    return undefined;
  }
  assertIsUser(fetchedUser);
  return fetchedUser;
};

export const updateUser = async (baseUserUpdate: BaseUserUpdate): Promise<User | undefined> => {
  assertIsBaseUserUpdate(baseUserUpdate);
  const now = new Date();
  const userUpdate: UserUpdate = {
    ...baseUserUpdate,
    updatedAt: now,
  };
  assertIsUserUpdate(userUpdate);
  await userUpdateDocRef(userUpdate.id).set(userUpdate, { merge: true });
  const user = await getUser(userUpdate.id);
  assertIsUser(user);
  return user;
};

export const deleteUser = async (userId: string): Promise<void> => {
  await userDocRef(userId).delete();
};

export const queryAllUsers = async (order: 'desc' | 'asc'): Promise<Users> => {
  return (await usersCollectionRef().orderBy('createdAt', order).get()).docs.map((snapshot) => snapshot.data());
};

export const snapshotToUser = async (snapshot: DocumentSnapshot): Promise<User | undefined> => {
  return (await snapshot.ref.withConverter(userConverter).get()).data();
};

export const snapshotToUserUpdate = async (snapshot: DocumentSnapshot): Promise<UserUpdate | undefined> => {
  return (await snapshot.ref.withConverter(userUpdateConverter).get()).data();
};
