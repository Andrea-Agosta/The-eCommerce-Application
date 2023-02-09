import { getStores } from "../dbRepository/store";
import { IStore } from "../type/store";

export const getAllStores = async (): Promise<IStore[]> => {
  return await getStores();
}