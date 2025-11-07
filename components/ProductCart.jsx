"use client";
import Link from "next/link";
import { useCart } from "../app/store/cart";

export default function ProductCard({p}){
  const {add}=useCart();
  return (
    <div className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
      <Link href={`/product/${p.slug}`} className="block">
        <img src={p.image} alt={p.name} className="h-64 w-full rounded-t-2xl object-cover"/>
        <div className="p-4">
          <div className="text-xs text-gray-500">MUSC & LENTILLES</div>
          <h3 className="mt-1 text-base font-semibold line-clamp-2">{p.name}</h3>
          <div className="mt-2 font-bold">{(p.price/100).toFixed(2)} €</div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button onClick={()=>add(p,1)} className="w-full rounded-full border px-5 py-2.5 hover:bg-gray-50">Ajouter au panier</button>
      </div>
    </div>
  );
}
