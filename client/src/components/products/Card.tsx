import { Link } from "react-router-dom";
import { IProduct } from "../../../../type/product";


export default function Card({ product }: { product: IProduct }) {
  return (
    <article className="flex flex-col border-2 rounded-2xl p-5 drop-shadow-md bg-[#EFF1F3] w-36">
      <Link
        to={`${product.category}/product/${product.id}`}
      >
        <figure className="overflow-hidden rounded-lg" >
          <img
            src={product.imageurl}
            alt={'title'}
            className='h-44'
          />
        </figure>
        <div className="h-32">
          <p className="mt-3 text-lg text-black font-bold"> {product.price} </p>
          <p className="mt-1 text-sm text-[#2E4057] border-b border-gray-600 border-dashed pb-2" > {product.quantity > 0 ? `Quantity: ${product.quantity}` : " Out of Stock"} </p>
          <h5 className="mt-2 font text-sm text-[#2F2D2E]"> {product.title} </h5>
        </div>
      </Link>
    </article >
  )
}