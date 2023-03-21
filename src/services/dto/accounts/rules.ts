import { Ilogin, Iregister } from "./model";


export function isLogin(obj: unknown): obj is Ilogin {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      typeof obj['email'] === 'string' &&
       obj['email'].trim() !== ''
       && typeof obj['password'] === 'string' &&
      obj['password'].trim() !== ''
    );
  }


export function isRegister(obj: unknown): obj is Iregister {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj['email'] === 'string' &&
     obj['email'].trim() !== '' &&
     typeof obj['name'] === 'string' &&
      obj['name'].trim() !== ''
     && typeof obj['password'] === 'string' &&
    obj['password'].trim() !== ''
  );
}