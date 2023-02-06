import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import db from "../database";


router.get('/', async (_req: Request, res: Response) => {
  const sql = "select * from ProductData";
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
  const sql = "select * from ProductData where id = ?";
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

export default router;