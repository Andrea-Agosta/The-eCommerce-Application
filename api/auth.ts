import passport from 'passport';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IBodyUser } from '../type/user';
const router = express.Router();
import '../controller/authController';



router.post('/signup', passport.authenticate('signup', { session: false }), async (req: Request<{}, {}, IBodyUser>, res: Response) => {
  try {
    const token = jwt.sign({ user: req.user }, 'TOP_SECRET', { expiresIn: '1h' });
    console.log(token, 'token');

    res.cookie('jwt', token).json({
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
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET', { expiresIn: '1h' });
        return res.cookie('jwt', token).send('cookie set');
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;