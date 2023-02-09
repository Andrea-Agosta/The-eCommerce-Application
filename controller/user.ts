// import { getUserByEmail } from '../dbRepository/user';
// import { Request } from 'express';
// import { IBodyUser, IBodyUserLogin } from '../type/user';
// import { addStore } from '../dbRepository/store';
// const bcrypt = require("bcrypt");
// const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;


// export const registerUser = async (req: Request<{}, {}, IBodyUser>): Promise<string> => {
//   if (emailRegex.test(req.body.email) && req.body.password && req.body.role) {
//     const salt = bcrypt.genSaltSync(Number(process.env.SALT));
//     const hashPassword = bcrypt.hashSync(req.body.password, salt);
//     if (req.body.storeName || req.body.storeId) {
//       if (req.body.storeName && !req.body.storeId) {
//         addStore(storeIdCount, req.body.storeName);
//         return createAdminUser(id, req.body.email, hashPassword, req.body.role, storeIdCount);
//       }
//       return createAdminUser(id, req.body.email, hashPassword, req.body.role, req.body.storeId);
//     }
//     return createUser(id, req.body.email, hashPassword, req.body.role);
//   }
//   throw new Error('Bad request');
// };

// export const loginUser = async (req: Request<{}, {}, IBodyUserLogin>): Promise<boolean> => {
//   if (emailRegex.test(req.body.email) && req.body.password) {
//     const user: IBodyUser[] = await getUserByEmail(req.body.email);
//     return bcrypt.compareSync(req.body.password, user[0]?.password);
//   }
//   throw new Error('Bad request');
// };