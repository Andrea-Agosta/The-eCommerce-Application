import { getAllProducts } from '../controller/product';
import express from 'express';
import { Request, Response } from 'express';
import { IProduct } from 'type/product';
import { getProductByID } from '../dbRepository/product';
const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const products: IProduct[] = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product: IProduct[] = await getProductByID(Number(req.params.id));
    res.status(200).json(product);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

export default router;