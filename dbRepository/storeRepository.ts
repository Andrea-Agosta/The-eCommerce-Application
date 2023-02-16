import { IStore } from "../type/store";
import { connectionDB } from "../database/dbConnection";

export const getStores = async (): Promise<IStore[]> => {
  const query: string = "select * from StoreData";
  return await connectionDB(query);
}

export const addStore = async (name: string): Promise<IStore[]> => {
  const query = `INSERT INTO StoreData (name) VALUES ('${name}')`;
  await connectionDB(query);
  return await getStoreByName(name);
};

export const getStoreByID = async (id: number): Promise<IStore[]> => {
  const query: string = `select * from StoreData WHERE uniqueStoreId = '${id}'`;
  return await connectionDB(query);
}

export const getStoreByName = async (name: string): Promise<IStore[]> => {
  const query: string = `select * from StoreData WHERE name = '${name}'`;
  return await connectionDB(query);
}

export const updateStoreByName = async (name: string): Promise<string> => {
  const query: string = `UPDATE StoreData SET name = '${name}'`;
  await connectionDB(query);
  return await 'Store Name Update';
}

export const deleteStore = async (id: number): Promise<string> => {
  const query: string = `DELETE FROM StoreData WHERE uniqueStoreId = '${id}'`;
  await connectionDB(query);
  return await 'Store successfully deleted';
};