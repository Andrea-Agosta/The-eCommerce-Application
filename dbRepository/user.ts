import { IUser } from "../type/user";
import { connectionDB } from "../database/dbConnection";

export const createAdminUser = async (email: string, password: string, role: string, storeId: number): Promise<string> => {
  const query: string = `INSERT INTO UserData (email, password, role, storeId) VALUES ('${email}','${password}','${role}','${storeId}')`;
  await connectionDB(query);
  return await 'user registrated;'
};

export const createUser = async (email: string, password: string, role: string): Promise<string> => {
  const query: string = `INSERT INTO UserData (email, password, role) VALUES ('${email}','${password}','${role}')`;
  await connectionDB(query);
  return await 'user registrated;'
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
  const query: string = `SELECT * FROM UserData WHERE email = '${email}'`;
  return await connectionDB(query);
};