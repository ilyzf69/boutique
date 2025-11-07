import { supabaseServer } from "../../../lib/supabase-server";
import Header from "../../../components/Header";
import AddToCart from "./ui/AddToCart";

export default async function ProductPage({ params }) {
  const supabase = supabaseServer();
  const { data: p } = await supabase.from("products").select("*").eq("slug", params.slug).single();
  if(!p) return <div className="p-8">Produit introuvable.</div>;

  return (
    <>
      <Header/>
      <main className="mx-auto max-w-screen-xl px-4 py-8 grid gap-10 md:grid-cols-2">
        <img src={p.image||""} alt={p.name} className="w-full rounded-3xl border object-cover"/>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">MUSC & LENTILLES</div>
          <h1 className="text-3xl font-bold">{p.name}</h1>
          <div className="text-2xl font-semibold">{(p.price/100).toFixed(2)} €</div>
          <p className="text-gray-700">{p.description}</p>
          <AddToCart product={p}/>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            <li>Livraison 2–4 jours ouvrés</li>
            <li>Retours sous 14 jours (voir CGV)</li>
          </ul>
        </div>
      </main>
    </>
  );
}
