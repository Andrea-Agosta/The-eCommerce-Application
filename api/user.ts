import express, { Request, Response } from 'express';
const router = express.Router();
import db from "../database";
import { IBodyUser, IBodyUserLogin } from '../type/user';
import { loginUser } from '../controller/user';

router.get('/', async (_req: Request, res: Response) => {
  const sql = "select * from UserData";
  const params: string[] = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

router.get('/:id', async (req: Request, res: Response) => {
  const sql = "select * from UserData where id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": row
    })
  });
});

router.patch('/:id', async (req: Request, res: Response) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    storeId: req.body.storeId
  }
  db.run(
    `UPDATE user set 
         email = COALESCE(?,email), 
         password = COALESCE(?,password)
         role = COALESCE(?,role)
         storeId = COALESCE(?,storeId)
         WHERE id = ?`,
    [data.email, data.password, data.role, data.storeId, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes
      })
    });
})

router.delete('/:id', async (req: Request, res: Response) => {
  db.run(
    'DELETE FROM UserData WHERE id = ?',
    req.params.id,
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({ "message": "deleted", changes: this.changes })
    });
})

export default router;