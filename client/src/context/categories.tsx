import { createContext, useState } from "react";

interface ICategoryContext {
  categories: string[],
  setCategories: React.Dispatch<React.SetStateAction<string[]>>,
}

interface IData {
  children: JSX.Element;
}

export const CategoriesContext = createContext<ICategoryContext>({} as ICategoryContext);

export const CategoriesContestProvider = ({ children }: IData) => {
  const [categories, setCategories] = useState<string[]>([]);
  return <CategoriesContext.Provider value={{ categories, setCategories }}> {children} </CategoriesContext.Provider>
};