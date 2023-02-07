import { IUser } from "../type/user";
import { connectionDB } from "../database/dbConnection";

export const createUser = async (id: number, email: string, password: string, role: string): Promise<void> => {
  const query: string = `INSERT INTO UserData (id, email, password, role) VALUES ('${id}','${email}','${password}','${role}')`;
  await connectionDB(query);
};

export const getUserByEmail = async (email: string): Promise<IUser[]> => {
  const query: string = `SELECT * FROM UserData WHERE email = '${email}'`;
  return await connectionDB(query);
};