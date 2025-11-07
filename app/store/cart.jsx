"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
const Ctx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{product, qty}]
  useEffect(()=>{ try{ const s=localStorage.getItem("cart"); if(s) setItems(JSON.parse(s)); }catch{}},[]);
  useEffect(()=>{ try{ localStorage.setItem("cart", JSON.stringify(items)); }catch{}},[items]);

  const add = (product, qty=1) => setItems(prev=>{
    const i = prev.findIndex(it=>it.product.id===product.id);
    if(i>=0){ const copy=[...prev]; copy[i]={...copy[i], qty:copy[i].qty+qty}; return copy; }
    return [...prev,{product,qty}];
  });
  const setQty = (id, q) => setItems(p=>p.map(it=>it.product.id===id?{...it, qty:Math.max(1,q)}:it));
  const remove = id => setItems(p=>p.filter(it=>it.product.id!==id));
  const total = useMemo(()=>items.reduce((s,it)=>s+it.product.price*it.qty,0),[items]);
  const count = useMemo(()=>items.reduce((s,it)=>s+it.qty,0),[items]);

  return <Ctx.Provider value={{items,add,setQty,remove,total,count}}>{children}</Ctx.Provider>;
}
export const useCart = ()=>{ const v=useContext(Ctx); if(!v) throw new Error("CartProvider missing"); return v; };
