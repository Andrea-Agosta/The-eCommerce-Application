import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import user from './api/user';
import auth from './api/auth';
import product from './api/product';
import store from './api/store';
import passport from 'passport';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';


const app: Application = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/store', passport.authenticate('jwt', { session: false }), store);

app.get("/", (_req: Request, res: Response) => {
  res.json({ "message": "Ok" })
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err);
});

export default app;