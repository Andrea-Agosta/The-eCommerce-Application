import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import db from "../database";
import bcrypt from "bcrypt";

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

router.post('/', async (req: Request, res: Response) => {
  const errors = [];
  if (!req.body.password) {
    errors.push("No password specified");
  }
  if (!req.body.email) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }

  process.env.SALT && bcrypt.hash(req.body.password, process.env.SALT, function (err, hash) {
    if (err) {
      new Error(err.message);
    }
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }
    const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    const params = [data.name, data.email, data.password]
    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.json({
        "message": "success",
        "data": data,
        "id": this.lastID
      })
    });
  });
})

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