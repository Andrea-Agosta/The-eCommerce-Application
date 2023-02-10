import { deleteProduct, getProductByID, getProducts, updateProduct } from "../dbRepository/productRepository";
import { IProduct, IProductUpdate } from "../type/product";
import { Request } from 'express';

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await getProducts();
};

export const getProductById = async (id: number): Promise<IProduct[]> => {
  if (id) {
    return await getProductByID(id);
  }
  throw new Error("Bad Request");
}

export const updateProductById = async (req: Request<{ id: string }, {}, IProductUpdate>): Promise<string> => {
  if (Number(req.params.id)) {
    let query: string = 'UPDATE ProductData SET';
    req.body.title && (query += `title = '${req.body.title}', `);
    req.body.description && (query += `description = '${req.body.description}', `);
    req.body.imageUrl && (query += `imageUrl = '${req.body.imageUrl}', `);
    req.body.price && (query += `price = '${req.body.price}', `);
    req.body.quantity && (query += `quantity = '${req.body.quantity}', `);
    req.body.category && (query += `category = '${req.body.category}', `);
    query += `WHERE id = '${req.params.id}'`;
    return await updateProduct(query);
  }
  throw new Error(`User ${req.params.id} does not exist`);
};

export const deleteProductById = async (id: number): Promise<string> => {
  return await deleteProduct(id);
};
