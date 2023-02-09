import { getProductByID, getProducts } from "../dbRepository/product";
import { IProduct } from "../type/product";

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await getProducts();
};

export const getProductById = async (id: number): Promise<IProduct[]> => {
  if (id) {
    return await getProductByID(id);
  }
  throw new Error("Bad Request");
}