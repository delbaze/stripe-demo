import { createContext, useState } from "react";
import fakedData from "@/fakeData.json";
import useLocalStorage from "./useLocalStorage";

interface ICartContext {
  cart: {
    id: string;
    reference: string;
    prix_hors_taxe: number;
    quantity: number;
  }[];
  addToCart: (reference: string) => void;
  removeFromCart: (reference: string) => void;
  deleteFromCart: (reference: string) => void;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

function CartProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useLocalStorage<ICartContext["cart"]>(
    "cart",
    fakedData
  );
  //   const [state, setState] = useState({ cart });

  const contextValue: ICartContext = {
    cart,
    addToCart: (reference: string) => {
      const cart_cpy = cart.map((o) => Object.assign({}, o));
      const item = cart_cpy.find((c) => c.reference === reference);
      if (item) {
        item.quantity++;
        setCart(cart_cpy);
      }
    },
    removeFromCart: (reference: string) => {
      const cart_cpy = cart.map((o) => Object.assign({}, o));
      const item = cart_cpy.find((c) => c.reference === reference);
      if (item && item.quantity > 1) {
        item.quantity--;
        setCart(cart_cpy);
      }
    },
    deleteFromCart: (reference: string) => {
      const newCart = cart.reduce<ICartContext["cart"]>((acc, item) => {
        if (item.reference !== reference) {
          acc.push({ ...item });
        }
        return acc;
      }, []);
      setCart(newCart);
    },
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
