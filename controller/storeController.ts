import { deleteProductFromStore } from "dbRepository/productRepository";
import { getStores, getStoreByID, deleteStore } from "../dbRepository/storeRepository";
import { IStore } from "../type/store";

export const getAllStores = async (): Promise<IStore[]> => {
  return await getStores();
}

export const getStoreById = async (id: number): Promise<IStore> => {
  if (id) return await getStoreByID(id);
  throw new Error("Bad Request");
}

export const deleteStoreById = async (id: number): Promise<string> => {
  await deleteProductFromStore(id);
  return await deleteStore(id);
};