import express, { Request, Response } from 'express';
import { getAllStores } from '../controller/storeController';
import { IStore } from '../type/store';
const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const store: IStore[] = await getAllStores();
    res.status(200).json(store);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default router;