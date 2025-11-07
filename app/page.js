import { supabaseServer } from "../lib/supabase-server";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

export default async function Home(){
  const supabase = supabaseServer();
  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending:false });

  return (
    <>
      <Header/>
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Hero/>
        <section id="best" className="mt-12">
          <h2 className="text-3xl font-bold text-center">Meilleures Ventes</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products?.map(p => <ProductCard key={p.id} p={p}/>)}
          </div>
        </section>
      </main>
    </>
  );
}
