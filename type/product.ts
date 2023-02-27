export interface IProduct {
  id: number;
  title: string;
  description: string;
  imageurl: string;
  storeId: number;
  price: string;
  quantity: number;
  category: string;
}

export interface IProductCreate extends IProduct {
  role: string;
}

export interface ICategory {
  category: {
    category: string;
  }
}

export interface ISearch {
  category: string;
  search: string;
}