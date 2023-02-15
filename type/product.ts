export interface IProduct {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  storeId: number;
  price: string;
  quantity: number;
  category: string;
}

export interface IProductUpdate extends IProduct {
  role: string;
}

export interface ICategory {
  category: {
    category: string;
  }
}