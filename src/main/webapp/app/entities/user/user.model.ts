export interface IUser {
  id: number;
  login?: string;
  imageUrl?:string;
  email?:string;
}

export class User implements IUser {
  constructor(public id: number, public login: string) {}
}

export function getUserIdentifier(user: IUser): number {
  return user.id;
}
