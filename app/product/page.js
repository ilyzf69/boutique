// app/product/page.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { supabaseServer } from "../../lib/supabase-server";

export default async function ProductIndex() {
  const supa = supabaseServer();
  const { data: products, error } = await supa
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <section className="hero-gradient rounded-2xl p-8 mb-10 border-gold">
          <h1 className="text-3xl font-bold">Boutique</h1>
          <p className="text-gray-700 mt-2">Tous nos produits</p>
        </section>

        {error ? (
          <div className="text-red-600">Erreur : {error.message}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(products || []).map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </main>
    </>
  );
}
