export const dynamic = "force-dynamic";

import { supabaseServer } from "../../../lib/supabase-server";
import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";
import AddToCart from "./ui/AddToCart";

export default async function ProductRouter({ searchParams }) {
  const supabase = supabaseServer();
  const slug = (searchParams?.slug || "").trim();

  // MODE FICHE PRODUIT
  if (slug) {
    const { data: p, error } = await supabase
      .from("products")
      .select("id,slug,name,description,image,category,price")
      .eq("slug", slug)
      .maybeSingle();

    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8">
          {!p || error ? (
            <div className="mx-auto max-w-3xl p-8">
              <h1 className="text-xl font-bold">Produit introuvable.</h1>
              <p className="text-gray-600">Slug demandé : <code>{slug || "(aucun)"}</code></p>
              <a className="underline mt-4 inline-block" href="/product">← Retour à la boutique</a>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              <img src={p.image || ""} alt={p.name} className="w-full rounded-3xl border object-cover" />
              <div className="space-y-4">
                <div className="text-sm text-gray-500">MUSC & LENTILLES</div>
                <h1 className="text-3xl font-bold">{p.name}</h1>
                <div className="text-2xl font-semibold">{(p.price / 100).toFixed(2)} €</div>
                <p className="text-gray-700">{p.description}</p>
                <AddToCart product={p} />
                <ul className="text-sm text-gray-600 list-disc pl-5">
                  <li>Livraison 2–4 jours ouvrés</li>
                  <li>Retours sous 14 jours (voir CGV)</li>
                </ul>
                <a className="underline text-sm" href="/product">← Retour à la boutique</a>
              </div>
            </div>
          )}
        </main>
      </>
    );
  }

  // MODE LISTE (même affichage que la Home)
  const { data: products, error: listError } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <section className="mb-8 rounded-2xl p-8 bg-pink-100/60 border">
          <h1 className="text-2xl md:text-3xl font-bold">
            Parfums <span className="text-pink-500">Musc</span> & Lentilles cosmétiques
          </h1>
          <p className="text-gray-700 mt-2">Sélection du moment — environnement de test.</p>
        </section>

        {listError ? (
          <div className="text-red-600">Erreur: {listError.message}</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products?.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </main>
    </>
  );
}
