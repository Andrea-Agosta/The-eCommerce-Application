import { ChangeEvent, useContext } from "react";
import { CategoriesContext } from "../context/categories";

interface ISelect {
  handleCategoryChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
}

export const Select = ({ handleCategoryChange, name }: ISelect) => {
  const { categories } = useContext(CategoriesContext);
  const searchStyle = 'text-[#757575] bg-[#f2f2f2] hover:bg-gray-300 focus:outline-none font-medium rounded-l-lg text-sm px-4 py-2.5 text-center inline-flex items-cente';
  const formStyle = 'border p-2 rounded-lg my-1 focus:ring-orange-500 focus:ring-2 focus:outline-none';
  return (
    <select className={name === 'search' ? searchStyle : formStyle} onChange={handleCategoryChange} id='category' >
      {name === 'search' && <option>All</option>}
      {categories.map((category, index) => <option key={index}>{category}</option>)}
    </select>
  )
}
