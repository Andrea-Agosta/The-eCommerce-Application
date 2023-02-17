import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from "bcrypt";
import { addStore } from '../dbRepository/storeRepository';
import { createAdminUser, createUser, getUserByEmail } from '../dbRepository/userRepository';

const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, async (req, email: string, password: string, done: CallableFunction) => {
  try {
    if (emailRegex.test(email) && password && req.body.role) {
      const salt = bcrypt.genSaltSync(Number(process.env.SALT));
      const hashPassword = bcrypt.hashSync(password, salt);

      if (req.body.role === 'admin') {
        if (req.body.storeName) {
          const store = await addStore(req.body.storeName);
          const user = store[0] && await createAdminUser(email, hashPassword, req.body.role, store[0].uniqueStoreId);
          if (!user) {
            throw new Error('Bad request');
          }
          return done(null, user);
        }
        throw new Error('Bad request');
      }
      const user = createUser(email, hashPassword, req.body.role);
      return done(null, user);
    }
    const checkIfEmailAlreadyExists = await getUserByEmail(email);
    throw !checkIfEmailAlreadyExists ? new Error('Email already exists') : new Error('Bad request');
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email: string, password: string, done: CallableFunction) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const validate: boolean | undefined = user[0] && bcrypt.compareSync(password, user[0].password);

    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTstrategy({ secretOrKey: 'TOP_SECRET', jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token') }, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));