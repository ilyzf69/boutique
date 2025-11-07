"use client";
import { useState } from "react";
import { useCart } from "../../../store/cart";

export default function AddToCart({ product }){
  const { add } = useCart();
  const [qty,setQty]=useState(1);
  const [ok,setOk]=useState(false);
  const isLens = product.category==="lentilles";
  const handle=()=>{
    if(isLens && !ok){ alert("Veuillez confirmer les informations d’utilisation des lentilles."); return; }
    add(product, qty);
  };
  return (
    <div className="space-y-4">
      {isLens && (
        <>
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white">
            Lentilles cosmétiques non correctrices
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1" checked={ok} onChange={e=>setOk(e.target.checked)}/>
            <span>J’ai lu les <a className="underline" href="/legal/lentilles" target="_blank">infos d’utilisation</a>.</span>
          </label>
        </>
      )}
      <div className="flex items-center gap-3">
        <div className="inline-flex items-center gap-2 border rounded-full px-3 py-2">
          <button onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
          <input className="w-12 text-center outline-none" value={qty} onChange={e=>setQty(Math.max(1,parseInt(e.target.value||"1",10)))}/>
          <button onClick={()=>setQty(q=>q+1)}>＋</button>
        </div>
        <button onClick={handle} className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
