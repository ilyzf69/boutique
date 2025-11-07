"use client";
import { useCart } from "../store/cart";

export default function CartPage(){
  const { items,setQty,remove,total } = useCart();

  const pay = async ()=>{
    const res = await fetch("/api/checkout",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ items })});
    const data = await res.json();
    if(data?.url) window.location.href = data.url; else alert(data?.error || "Paiement indisponible");
  };

  if(!items.length) return <div className="p-8">Votre panier est vide.</div>;

  return (
    <div className="mx-auto max-w-screen-md p-6 space-y-6">
      <h1 className="text-2xl font-bold">Panier</h1>
      <ul className="space-y-4">
        {items.map(({product,qty})=>(
          <li key={product.id} className="flex items-center gap-4 rounded-2xl border p-4">
            <img src={product.image} className="h-16 w-16 rounded-lg object-cover"/>
            <div className="flex-1">
              <div className="font-semibold">{product.name}</div>
              <div className="text-sm text-gray-600">{(product.price/100).toFixed(2)} €</div>
            </div>
            <div className="inline-flex items-center gap-2 border rounded-full px-3 py-2">
              <button onClick={()=>setQty(product.id, Math.max(1,qty-1))}>−</button>
              <input className="w-12 text-center" value={qty} onChange={e=>setQty(product.id, Math.max(1, parseInt(e.target.value||"1",10)))}/>
              <button onClick={()=>setQty(product.id, qty+1)}>＋</button>
            </div>
            <div className="w-28 text-right">{((product.price*qty)/100).toFixed(2)} €</div>
            <button onClick={()=>remove(product.id)} className="text-red-600">Supprimer</button>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-xl font-semibold">Total</div>
        <div className="text-2xl font-bold">{(total/100).toFixed(2)} €</div>
      </div>
      <div className="flex gap-3">
        <button onClick={pay} className="rounded-full bg-black px-6 py-3 text-white hover:opacity-90">Passer au paiement</button>
        <a href="/" className="rounded-full border px-6 py-3 hover:bg-gray-50">Continuer mes achats</a>
      </div>
    </div>
  );
}
