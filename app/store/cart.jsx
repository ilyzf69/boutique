"use client";
import { createContext, useContext, useMemo, useState } from "react";
const CartCtx = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{product, qty}]

  const add = (product, qty=1)=>{
    setItems(prev=>{
      const i = prev.findIndex(x=>x.product.id===product.id);
      if(i>=0){ const cp=[...prev]; cp[i]={...cp[i], qty: cp[i].qty + qty}; return cp; }
      return [...prev, {product, qty}];
    });
  };
  const remove = (id)=> setItems(prev=> prev.filter(x=>x.product.id!==id));
  const clear = ()=> setItems([]);

  const { totalQty, totalPrice } = useMemo(()=>{
    const t = items.reduce((acc, it)=> {
      const q = Number(it.qty)||0; const p = Number(it.product?.price)||0;
      acc.qty += q; acc.price += q*p; return acc;
    }, {qty:0, price:0});
    return { totalQty: t.qty, totalPrice: t.price };
  }, [items]);

  return <CartCtx.Provider value={{items, add, remove, clear, totalQty, totalPrice}}>{children}</CartCtx.Provider>;
}
export const useCart = ()=> useContext(CartCtx);
