import { createContext, useState } from "react";
import { IProduct } from '../../../type/product'

interface IProductContext {
  products: IProduct[],
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>,
}

interface IData {
  children: JSX.Element;
}

export const ProductContext = createContext<IProductContext>({} as IProductContext);

export const ProductContestProvider = ({ children }: IData) => {
  const [products, setProducts] = useState<IProduct[]>([{} as IProduct]);
  return <ProductContext.Provider value={{ products, setProducts }}> {children} </ProductContext.Provider>
};