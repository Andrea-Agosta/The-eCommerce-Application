import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controller/user';
import express, { Request, Response } from 'express';
import { IUser } from '../type/user';
const router = express.Router();


router.get('/', async (_req: Request, res: Response) => {
  try {
    const users: IUser[] = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user: IUser = await getUserById(Number(req.params.id));
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const user: string = await updateUserById(req);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const response = await deleteUserById(Number(req.params.id));
    res.status(204).json(response);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

export default router;