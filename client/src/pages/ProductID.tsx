import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ICart } from "../../../type/cart";
import { IProduct } from "../../../type/product";
import { Slider } from "../components/products/Slider";
import { CartItemsContext } from "../context/cart";


const ProductID = () => {
  const [product, setProduct] = useState<IProduct>();
  const [rangeValue, setRangeValue] = useState<number>(1);
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => setRangeValue(Number(event.currentTarget.value));
  const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  const category = window.location.pathname.split('/')[1];
  const { cartItems, setCartItems } = useContext(CartItemsContext);

  const makeOrder = () => {
    if (product) {
      const cartItemIndex: number = cartItems.findIndex(item => item.product.id === product.id);
      const price: string = `${product.price.charAt(0)} ${(rangeValue * Number(product.price.slice(1, product.price.length))).toFixed(2)}`
      if (cartItemIndex !== -1) {
        const updatedCartItems: ICart[] = [...cartItems];
        updatedCartItems[cartItemIndex].quantity += rangeValue;
        updatedCartItems[cartItemIndex].total = price;
        setCartItems(updatedCartItems);
      } else {
        setCartItems(prevState => [...prevState, { quantity: rangeValue, product: product, total: price }]);
      }
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }

  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cart');
    storedCartItems && setCartItems(JSON.parse(storedCartItems));
  }, []);

  useEffect(() => {
    axios({ method: 'get', url: `http://localhost:8080/api/product/categories/${category}/${id}` })
      .then(async response => await setProduct(response.data[0]));
  }, [id]);

  return (
    <>
      {/* banner */}
      <div
        className="bnr max-w-full bg-black px-4 py-1 overflow-hidden bg-gradient-to-br from-red-600 to-blue-900"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)"
          , backgroundSize: "cover"
        }}
      >
        <h2 className="text-orange-400 text-2xl text-center text-shadow p-5">Don't be late for the superdeal</h2>
      </div>

      {/* page */}
      <article className="flex flex-col md:flex-row drop-shadow-md max-w-sm md:max-w-fit p-4 md:p-10">
        <figure className="rounded-t-2xl md:rounded-l-2xl md:rounded-r-none flex justify-center bg-[#f6f6f6] md:w-[230%]" >
          <img src={product?.imageurl} alt={product?.title} className='h-40 my-5' />
        </figure>
        <div className='p-5 bg-white rounded-b-2xl md:rounded-r-2xl md:rounded-l-none'>
          <h1 className="font font-bold tracking-tight text-black">{product?.title}</h1>
          <p className="mt-4 text-[#2E4057]">{product?.description}</p>
          <div className="flex flex-row justify-between mt-10 text-3xl">
            <h2>{product?.price}</h2>
            <p className={(product && product.quantity > 10) ? 'text-green-500' : 'text-red-500'}>{(product && product.quantity > 0 ? `${product.quantity} pz` : product?.quantity)}</p>
          </div>
          <div className="mt-8">
            <p className="text-orange-400 font-bold text-lg">Select Amount:</p>
            <Slider storage={product?.quantity} handleAmountChange={handleAmountChange} rangeValue={rangeValue} />
          </div>
          <button className="rounded px-24 py-4 mt-7 bg-white hover:bg-orange-400 border-2 border-orange-400 mb-5 text-orange-400 hover:text-white" onClick={makeOrder}>Order</button>
        </div>
      </article>
    </>
  )
}

export default ProductID