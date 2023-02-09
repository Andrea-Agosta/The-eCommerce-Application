import { getStores } from "../dbRepository/storeRepository";
import { IStore } from "../type/store";

export const getAllStores = async (): Promise<IStore[]> => {
  return await getStores();
}