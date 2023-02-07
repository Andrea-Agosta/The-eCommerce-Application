export interface IBodyUserLogin {
  email: string;
  password: string;
}

export interface IBodyUser extends IBodyUserLogin {
  role: string;
  storeId: number;
}

export interface IUser extends IBodyUser {
  id: number;
}