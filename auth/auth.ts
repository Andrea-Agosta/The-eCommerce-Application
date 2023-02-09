import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';

passport.use('signup', new localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email: string, password: string, done: CallableFunction) => {
  try {
    // const user = await UserModel.create({ email, password });
    console.log(email, password, 'userData');

    // return done(null, user);
  } catch (error) {
    done(error);
  }
}));



passport.use('login', new localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email: string, password: string, done: CallableFunction) => {
  try {
    // const user = await UserModel.findOne({ email });

    // if (!user) {
    //   return done(null, false, { message: 'User not found' });
    // }

    // const validate = await user.isValidPassword(password);

    // if (!validate) {
    //   return done(null, false, { message: 'Wrong Password' });
    // }

    // return done(null, user, { message: 'Logged in Successfully' });
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