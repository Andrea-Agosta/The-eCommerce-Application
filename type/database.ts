export interface IDatabaseUser {
  id: number;
  email: string;
  password: string;
  role: string;
  storeId: number;
}

export interface IDatabaseStore {
  id: number;
  name: string;
  uniqueStoreId: number;
}

export interface IDatabaseProduct {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  storeId: number;
  price: string;
  quantity: number;
  category: string;
}