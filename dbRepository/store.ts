import { IStore } from "../type/store";
import { connectionDB } from "../database/dbConnection";

export const getStores = async (): Promise<IStore[]> => {
  const query: string = "select * from StoreData";
  return await connectionDB(query);
}

export const addStore = async (storeId: number, name: string) => {
  const query = `INSERT INTO StoreData (uniqueStoreId, name) VALUES ('${storeId}','${name}')`;
  await connectionDB(query);
  return 'store created successfully';
};
