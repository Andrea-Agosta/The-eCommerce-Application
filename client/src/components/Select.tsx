import { useContext } from "react";
import { CategoriesContext } from "../context/categories";

export const Select = () => {
  const { categories } = useContext(CategoriesContext);
  return (
    <select className="text-[#757575] bg-[#f2f2f2] hover:bg-gray-300 focus:outline-none font-medium rounded-l-lg text-sm px-4 py-2.5 text-center inline-flex items-cente">
      <option>All</option>
      {categories.map((category, index) => <option key={index}>{category}</option>)}
    </select>
  )
}
