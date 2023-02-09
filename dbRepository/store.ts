import { IStore } from "../type/store";
import { connectionDB } from "../database/dbConnection";

export const getStores = async (): Promise<IStore[]> => {
  const query: string = "select * from StoreData";
  return await connectionDB(query);
}

export const addStore = async (name: string): Promise<IStore> => {
  const query = `INSERT INTO StoreData (name) VALUES ('${name}')`;
  await connectionDB(query);
  return await getStoreByName(name);
};

export const getStoreByName = async (name: string): Promise<IStore> => {
  const query: string = `select * from StoreData WHERE name = '${name}'`;
  return await connectionDB(query);
}