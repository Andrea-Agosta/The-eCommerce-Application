import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { Application } from 'express';
import bodyParser from 'body-parser';
import md5 from "md5";


const app: Application = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

export default app;