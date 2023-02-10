import { deleteProductById, getAllProducts, updateProductById } from '../controller/productController';
import express, { Request, Response } from 'express';
import { IProduct, IProductUpdate } from 'type/product';
import { getProductByID } from '../dbRepository/productRepository';
import passport from 'passport';
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

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req: Request<{ id: string }, {}, IProductUpdate>, res: Response) => {
  try {
    if (req.body.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const product: string = await updateProductById(req);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
  try {
    if (req.body.role !== 'admin') {
      return res.status(403).send({ message: 'Forbidden access' });
    }
    const response = await deleteProductById(Number(req.params.id));
    return res.status(204).json(response);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
})

export default router;