import passport from 'passport';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IBodyUser } from '../type/user';
const router = express.Router();
import '../controller/authController';


router.post('/signup', passport.authenticate('signup', { session: false }), async (req: Request<{}, {}, IBodyUser>, res: Response) => {
  try {
    if (!process.env.TOP_SECRET) {
      throw new Error('Missing TOP_SECRET environment variable');
    }
    const body = { email: req.body.email, role: req.body.role, storeId: req.body.storeId };
    const token = jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: '1h' });
    res.cookie('auth', token).json({
      message: 'Signup successful',
      user: req.user
    });
  } catch (err) {
    res.status(404).send(err);
  }
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
        const body = { email: user[0].email, role: user[0].role, storeeId: user[0].storeId };
        if (!process.env.TOP_SECRET) {
          throw new Error('Missing TOP_SECRET environment variable');
        }
        const token = jwt.sign({ user: body }, process.env.TOP_SECRET, { expiresIn: '1h' });
        return res.cookie('auth', token).send('cookie set');
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;