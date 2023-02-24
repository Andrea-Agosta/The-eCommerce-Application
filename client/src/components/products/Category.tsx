import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export const Category = ({ category }: { category: string }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    import(`../../images/${category}.jpg`)
      .then((module) => setImageSrc(module.default))
      .catch((error) => console.error(error));
  }, [category]);

  return (
    <Link to={`/category/${category}`} >
      <div className="m-4 border rounded-lg shadow-md p-3">
        <div className="flex justify-between mb-2">
          <h1 className="font-bold">{category}</h1>
          <p className="hidden md:block hover:text-orange-400">See More</p>
        </div>
        <div className="overflow-hidden h-40 max-h-40">
          <img src={imageSrc} alt={category} className="object-contain " />
        </div>
      </div>
    </Link >
  )
}
