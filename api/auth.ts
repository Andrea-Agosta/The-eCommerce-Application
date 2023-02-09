import passport from 'passport';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IBodyUser } from '../type/user';
const router = express.Router();
import '../controller/auth';



router.post('/signup', passport.authenticate('signup', { session: false }), async (req: Request<{}, {}, IBodyUser>, res: Response) => {
  res.json({
    message: 'Signup successful',
    user: req.user
  });
});

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;