import { connectionDB } from "../database/dbConnection";
import { IProduct } from "../type/product";

export const getProducts = async (): Promise<IProduct[]> => {
  const query: string = "select * from ProductData";
  return await connectionDB(query);
};

export const getProductByID = async (id: number): Promise<IProduct[]> => {
  const query: string = `select * from ProductData where id = '${id}'`;
  return await connectionDB(query);
};