import { connectionDB } from "../database/dbConnection";
import { IProduct, IProductCreate } from "../type/product";
import { Request } from 'express';


export const getProducts = async (): Promise<IProduct[]> => {
  const query: string = "select * from ProductData";
  return await connectionDB(query);
};

export const getSearchProducts = async (category: string, search: string): Promise<IProduct[]> => {
  if (category === 'All') {
    const query: string = `SELECT * from ProductData where title ILIKE '%' || '${search}' || '%' OR description ILIKE '%' || '${search}' || 
    '%' OR price::text ILIKE '%' || '${search}' || '%' OR quantity::text ILIKE '%' || '${search}' || '%';`;
    return await connectionDB(query);
  }
  const query: string = `SELECT * FROM ProductData WHERE category = '${category}' AND (title ILIKE '%' || '${search}' || '%'
      OR description ILIKE '%' || '${search}' || '%' OR price::text ILIKE '%' || '${search}' || '%' OR quantity::text ILIKE '%' || '${search}' || '%');`
  return await connectionDB(query);
};

export const getCategories = async (): Promise<IProduct[]> => {
  const query: string = "SELECT DISTINCT(category) from ProductData;";
  return await connectionDB(query);
};

export const getProductByID = async (id: number): Promise<IProduct[]> => {
  const query: string = `select * from ProductData where id = '${id}'`;
  return await connectionDB(query);
};

export const productsByCategory = async (category: string): Promise<IProduct[]> => {
  const query: string = `select * from ProductData where category = '${category}'`;
  return await connectionDB(query);
};

export const addProduct = async (req: Request<{}, {}, IProductCreate>): Promise<string> => {
  const query: string = `INSERT INTO ProductData (title, description, imageUrl, storeId, price, quantity, category) VALUES ('${req.body.title}','${req.body.description}','${req.body.imageurl}','${req.body.storeId}', '${req.body.price}', '${req.body.quantity}', '${req.body.category}')`;
  await connectionDB(query);
  return 'Product added successfully'
};

export const updateProduct = async (query: string): Promise<string> => {
  await connectionDB(query);
  return 'Product successfully updated';
};

export const deleteProduct = async (id: number): Promise<string> => {
  const query: string = `DELETE FROM ProductData WHERE id = '${id}'`;
  await connectionDB(query);
  return await 'Product deleted;'
}

export const deleteProductFromStore = async (id: number): Promise<string> => {
  const query: string = `DELETE FROM ProductData WHERE storeId = '${id}'`;
  await connectionDB(query);
  return await 'Product deleted;'
}