import { IProduct } from "./product";

export interface ICart {
  quantity: number,
  product: IProduct,
};