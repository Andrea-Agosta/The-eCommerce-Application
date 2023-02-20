import { useContext, useEffect } from 'react';
import { Trash3 } from 'react-bootstrap-icons';
import { ICart } from '../../../../type/cart';
import { CartItemsContext } from '../../context/cart';


export const CartItem = ({ item }: { item: ICart }) => {
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const deleteCartItem = () => {
    setCartItems(cartItems.filter(cartItem => cartItem !== item));
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <article className="my-4 border rounded-lg flex shadow justify-between">
      <div className='flex'>
        <img src={item.product.imageurl} alt={"picture of product"} className="w-20 h-20" />
        <section className="text-sm p-1">
          <h2 className='break-words border-b font-bold'> {item.product.title}</h2>
          <h3>Amount:  {item.quantity}</h3>
          <div className='flex justify-between'>
            <h3> Price: {`${item.product.price.charAt(0)} ${(item.quantity * Number(item.product.price.slice(1, item.product.price.length))).toFixed(2)}`}</h3>
            <button className='md:hidden' onClick={() => deleteCartItem()}><Trash3 className='text-lg' /></button>
          </div>
        </section>
      </div>
      <button className='mr-4 hidden md:block' onClick={() => deleteCartItem()}><Trash3 className='text-lg' /></button>
    </article >
  )
}
