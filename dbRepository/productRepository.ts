import { connectionDB } from "../database/dbConnection";
import { IProduct } from "../type/product";

export const getProducts = async (): Promise<IProduct[]> => {
  const query: string = "select * from ProductData";
  return await connectionDB(query);
};

export const getSearchProducts = async (category: string, search: string): Promise<IProduct[]> => {
  if (category === 'All') {
    const query: string = `SELECT * from ProductData where title LIKE '%' || '${search}' || '%' OR description LIKE '%' || '${search}' || 
    '%' OR price::text LIKE '%' || '${search}' || '%' OR quantity::text LIKE '%' || '${search}' || '%';`;
    return await connectionDB(query);
  }
  const query: string = `SELECT * FROM ProductData WHERE category = '${category}' AND (title LIKE '%' || '${search}' || '%'
      OR description LIKE '%' || '${search}' || '%' OR price::text LIKE '%' || '${search}' || '%' OR quantity::text LIKE '%' || '${search}' || '%');`
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