import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { supabaseServer } from "../../lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const ORDER = ["musc","autobronzant","autobronzant_visage","accessoires"];

export default async function Categories() {
  const supa = supabaseServer();
  const { data: products } = await supa.from("products").select("*");
  const groups = (products || []).reduce((acc, p) => {
    const k = p.category || "autres";
    acc[k] ||= [];
    acc[k].push(p);
    return acc;
  }, {});
  const keys = Object.keys(groups).sort((a,b)=>ORDER.indexOf(a)-ORDER.indexOf(b));

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Catégories</h1>
        <div className="space-y-10">
          {keys.map((k) => (
            <section key={k}>
              <h2 className="text-xl font-semibold capitalize mb-4">{k.replace("_"," ")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {groups[k].map(p => <ProductCard key={p.id} p={p} />)}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
