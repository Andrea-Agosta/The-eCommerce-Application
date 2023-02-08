import { connectionDB } from "../database/dbConnection";

export const addStore = async (storeId: number, name: string) => {
  const query = `INSERT INTO StoreData (uniqueStoreId, name) VALUES ('${storeId}','${name}')`;
  await connectionDB(query);
  return 'store created successfully';
};
