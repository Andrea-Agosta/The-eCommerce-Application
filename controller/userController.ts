import { deleteUser, getUserByID, getUsers, updateUser } from '../dbRepository/userRepository';
import { Request } from 'express';
import { IBodyUser, IUser } from '../type/user';
import { updateStoreByName } from '../dbRepository/storeRepository';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const getAllUsers = async (): Promise<IUser[]> => {
  return await getUsers();
};

export const getUserById = async (id: number): Promise<IUser> => {
  if (id) return await getUserByID(id);
  throw new Error(`User ${id} does not exist`);
}

export const updateUserById = async (req: Request<{}, {}, IBodyUser>): Promise<string> => {
  let query: string = 'UPDATE users SET';
  req.body.email && emailRegex.test(req.body.email) && (query += `email = '${req.body.email}', `);
  req.body.password && (query += `password = '${req.body.password}', `);
  req.body.role && (query += `role = '${req.body.role}', `);
  req.body.storeName && updateStoreByName(req.body.storeName);
  return await updateUser(query);
};

export const deleteUserById = async (id: number): Promise<string> => {
  return await deleteUser(id);
};
