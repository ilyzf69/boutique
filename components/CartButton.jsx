"use client";
import Link from "next/link";
import { useCart } from "../app/store/cart";

export default function CartButton(){
  const {count,total}=useCart();
  return (
    <Link href="/cart" className="inline-flex items-center rounded-full border px-5 py-2.5 hover:bg-gray-50">
      Panier ({count}) — {(total/100).toFixed(2)} €
    </Link>
  );
}
