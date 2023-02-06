import { loadEnv } from './env';
loadEnv();
require('./server');
import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import user from 'api/user';
import product from 'api/product';


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', user);
app.use('/api/product', product);

export default app;