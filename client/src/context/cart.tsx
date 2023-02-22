import { createContext, useState } from "react";
import { ICart } from "../../../type/cart";

interface ICartContext {
  cartItems: ICart[],
  setCartItems: React.Dispatch<React.SetStateAction<ICart[]>>,
}

interface IData {
  children: JSX.Element;
}

export const CartItemsContext = createContext<ICartContext>({} as ICartContext);

export const CartItemsContestProvider = ({ children }: IData) => {
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  return <CartItemsContext.Provider value={{ cartItems, setCartItems }}> {children} </CartItemsContext.Provider>
};