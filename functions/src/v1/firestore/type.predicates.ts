import type { BaseUser, NewUser, User, BaseUserUpdate, UserUpdate } from './user/type';

const isString = (value: unknown): value is string => typeof value === 'string';
const isDate = (value: unknown): value is Date =>
  value instanceof Date || Object.prototype.toString.call(value) === '[Object Date]';
const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';
const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isUnion =
  (unionChecks: ((value: unknown) => boolean)[]) =>
  (value: unknown): boolean =>
    unionChecks.reduce((s: boolean, isT) => s || isT(value), false);

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
