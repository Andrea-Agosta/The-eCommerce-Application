import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import user from './api/user';
import authentication from './api/authentication';
import product from './api/product';
// import store from './api/store';


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/auth', authentication);
app.use('/api/product', product);
// app.use('/api/store', store);

app.get("/", (_req, res) => {
  res.json({ "message": "Ok" })
});

app.use(function (_req, res) {
  res.status(404);
});

export default app;