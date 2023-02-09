export interface IBodyUserLogin {
  email: string;
  password: string;
}

export interface IBodyUser extends IBodyUserLogin {
  role: string;
  storeId: number;
  storeName: string;
}

export interface IUpdateBodyUser extends IBodyUser {
  storeName: string;
}

export interface IUser extends IBodyUser {
  id: number;
}
