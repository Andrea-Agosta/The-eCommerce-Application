import { deleteStoreById, getAllStores, getStoreById } from '../controller/storeController';
import express, { Request, Response } from 'express';
import { IStore } from '../type/store';
const router = express.Router();


router.get('/', async (req: Request, res: Response) => {
  try {
    if (req.body.role !== 'super-admin') {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const store: IStore[] = await getAllStores();
    return res.status(200).json(store);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (req.body.role === 'user') {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const store: IStore[] = await getStoreById(Number(req.params.id));
    return res.status(200).json(store);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    if (req.body.role !== 'super-admin') {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const response: string = await deleteStoreById(Number(req.params.id));
    return res.status(204).json(response);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

export default router;