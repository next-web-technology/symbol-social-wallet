import type { AuthUserMetadata, AuthUserProvider, AuthUser } from './../services/auth/auth.type';
import type { BaseUser, NewUser, User, BaseUserUpdate, UserUpdate } from './../services/user/user.type';

const isString = (value: unknown): value is string => typeof value === 'string';
const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';
const isNull = (value: unknown): value is null => value === null;
const isDate = (value: unknown): value is Date =>
  value instanceof Date || Object.prototype.toString.call(value) === '[Object Date]';
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isUnion =
  (unionChecks: ((value: unknown) => boolean)[]) =>
  (value: unknown): boolean =>
    unionChecks.reduce((s: boolean, isT) => s || isT(value), false);
type ArrayCheckOption = 'all' | 'first';
const isArray =
  <T>(
    childCheckFn: ((value: unknown) => value is T) | ((value: unknown) => boolean),
    checkOption: ArrayCheckOption = 'all'
  ) =>
  (array: unknown): boolean =>
    Array.isArray(array) &&
    (checkOption === 'all'
      ? ((array) => {
          for (const val of array) {
            if (!childCheckFn(val)) return false;
          }
          return true;
        })(array)
      : typeof array[0] === 'undefined' || childCheckFn(array[0]));

export const isAuthUserMetadata = (arg_0: unknown): arg_0 is AuthUserMetadata =>
  isObject(arg_0) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['creatiionTime']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['lastSignInTime']);
export function assertIsAuthUserMetadata(value: unknown): asserts value is AuthUserMetadata {
  if (!isAuthUserMetadata(value)) throw new TypeError(`value must be AuthUserMetadata but received ${value}`);
}
export const isAuthUserProvider = (arg_0: unknown): arg_0 is AuthUserProvider =>
  isObject(arg_0) &&
  'displayName' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['displayName']) &&
  'email' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['email']) &&
  'phoneNumber' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['phoneNumber']) &&
  'photoURL' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['photoURL']) &&
  'providerId' in arg_0 &&
  isString(arg_0['providerId']) &&
  'uid' in arg_0 &&
  isString(arg_0['uid']);
export function assertIsAuthUserProvider(value: unknown): asserts value is AuthUserProvider {
  if (!isAuthUserProvider(value)) throw new TypeError(`value must be AuthUserProvider but received ${value}`);
}
export const isAuthUser = (arg_0: unknown): arg_0 is AuthUser =>
  isObject(arg_0) &&
  'displayName' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['displayName']) &&
  'email' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['email']) &&
  'emailVerified' in arg_0 &&
  ((arg_1: unknown): boolean =>
    isUnion([(arg_2: unknown): boolean => arg_2 === false, (arg_2: unknown): boolean => arg_2 === true])(arg_1))(
    arg_0['emailVerified']
  ) &&
  'isAnonymous' in arg_0 &&
  ((arg_1: unknown): boolean =>
    isUnion([(arg_2: unknown): boolean => arg_2 === false, (arg_2: unknown): boolean => arg_2 === true])(arg_1))(
    arg_0['isAnonymous']
  ) &&
  'metadata' in arg_0 &&
  isAuthUserMetadata(arg_0['metadata']) &&
  'phoneNumber' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['phoneNumber']) &&
  'photoURL' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['photoURL']) &&
  'providerData' in arg_0 &&
  ((arg_1: unknown): boolean => isArray(isAuthUserProvider)(arg_1))(arg_0['providerData']) &&
  'providerId' in arg_0 &&
  isString(arg_0['providerId']) &&
  'refreshToken' in arg_0 &&
  isString(arg_0['refreshToken']) &&
  'tenantId' in arg_0 &&
  ((arg_1: unknown): boolean => isUnion([isNull, isString])(arg_1))(arg_0['tenantId']) &&
  'uid' in arg_0 &&
  isString(arg_0['uid']);
export function assertIsAuthUser(value: unknown): asserts value is AuthUser {
  if (!isAuthUser(value)) throw new TypeError(`value must be AuthUser but received ${value}`);
}
export const isBaseUser = (arg_0: unknown): arg_0 is BaseUser =>
  isObject(arg_0) &&
  'name' in arg_0 &&
  isString(arg_0['name']) &&
  'photoUrl' in arg_0 &&
  isString(arg_0['photoUrl']) &&
  'bio' in arg_0 &&
  isString(arg_0['bio']) &&
  'provider' in arg_0 &&
  isString(arg_0['provider']) &&
  'google' in arg_0 &&
  isString(arg_0['google']) &&
  'twitter' in arg_0 &&
  isString(arg_0['twitter']) &&
  'github' in arg_0 &&
  isString(arg_0['github']);
export function assertIsBaseUser(value: unknown): asserts value is BaseUser {
  if (!isBaseUser(value)) throw new TypeError(`value must be BaseUser but received ${value}`);
}
export const isNewUser = (arg_0: unknown): arg_0 is NewUser =>
  isObject(arg_0) &&
  'createdAt' in arg_0 &&
  isDate(arg_0['createdAt']) &&
  'updatedAt' in arg_0 &&
  isDate(arg_0['updatedAt']) &&
  'name' in arg_0 &&
  isString(arg_0['name']) &&
  'photoUrl' in arg_0 &&
  isString(arg_0['photoUrl']) &&
  'bio' in arg_0 &&
  isString(arg_0['bio']) &&
  'provider' in arg_0 &&
  isString(arg_0['provider']) &&
  'google' in arg_0 &&
  isString(arg_0['google']) &&
  'twitter' in arg_0 &&
  isString(arg_0['twitter']) &&
  'github' in arg_0 &&
  isString(arg_0['github']);
export function assertIsNewUser(value: unknown): asserts value is NewUser {
  if (!isNewUser(value)) throw new TypeError(`value must be NewUser but received ${value}`);
}
export const isUser = (arg_0: unknown): arg_0 is User =>
  isObject(arg_0) &&
  'id' in arg_0 &&
  isString(arg_0['id']) &&
  'createdAt' in arg_0 &&
  isDate(arg_0['createdAt']) &&
  'updatedAt' in arg_0 &&
  isDate(arg_0['updatedAt']) &&
  'name' in arg_0 &&
  isString(arg_0['name']) &&
  'photoUrl' in arg_0 &&
  isString(arg_0['photoUrl']) &&
  'bio' in arg_0 &&
  isString(arg_0['bio']) &&
  'provider' in arg_0 &&
  isString(arg_0['provider']) &&
  'google' in arg_0 &&
  isString(arg_0['google']) &&
  'twitter' in arg_0 &&
  isString(arg_0['twitter']) &&
  'github' in arg_0 &&
  isString(arg_0['github']);
export function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) throw new TypeError(`value must be User but received ${value}`);
}
export const isBaseUserUpdate = (arg_0: unknown): arg_0 is BaseUserUpdate =>
  isObject(arg_0) &&
  'id' in arg_0 &&
  isString(arg_0['id']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['name']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['photoUrl']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['bio']);
export function assertIsBaseUserUpdate(value: unknown): asserts value is BaseUserUpdate {
  if (!isBaseUserUpdate(value)) throw new TypeError(`value must be BaseUserUpdate but received ${value}`);
}
export const isUserUpdate = (arg_0: unknown): arg_0 is UserUpdate =>
  isObject(arg_0) &&
  'updatedAt' in arg_0 &&
  isDate(arg_0['updatedAt']) &&
  'id' in arg_0 &&
  isString(arg_0['id']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['name']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['photoUrl']) &&
  ((arg_1: unknown): boolean => isUnion([isUndefined, isString])(arg_1))(arg_0['bio']);
export function assertIsUserUpdate(value: unknown): asserts value is UserUpdate {
  if (!isUserUpdate(value)) throw new TypeError(`value must be UserUpdate but received ${value}`);
}
