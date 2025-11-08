export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { supabaseServer } from "../lib/supabase-server";
import Trans from "../components/Trans";

export default async function Home() {
  const supa = supabaseServer();
  const { data: products } = await supa.from("products").select("*").order("created_at",{ascending:false});
  const picks = (products||[]).slice(0,4);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8 space-y-12">
        <HeroSlider />

        <section>
          <SectionTitle>
            <Trans k="whyUs" />
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="font-semibold"><Trans k="why1" /></div>
              <p className="text-sm text-gray-600 mt-1"><Trans k="why1d" /></p>
            </div>
            <div className="card p-6">
              <div className="font-semibold"><Trans k="why2" /></div>
              <p className="text-sm text-gray-600 mt-1"><Trans k="why2d" /></p>
            </div>
            <div className="card p-6">
              <div className="font-semibold"><Trans k="why3" /></div>
              <p className="text-sm text-gray-600 mt-1"><Trans k="why3d" /></p>
            </div>
          </div>
        </section>

        <section>
          <SectionTitle><Trans k="bestSellers" /></SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map(p=> <ProductCard key={p.id} p={p} />)}
          </div>
        </section>

        <section>
          <SectionTitle><Trans k="categories" /></SectionTitle>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/categories" className="card p-6 text-center hover:shadow">
              <div className="text-lg font-semibold"><Trans k="catMusc" /></div>
              <p className="text-sm text-gray-600 mt-1">Huiles 10 ml</p>
            </a>
            <a href="/categories" className="card p-6 text-center hover:shadow">
              <div className="text-lg font-semibold"><Trans k="catTan" /></div>
              <p className="text-sm text-gray-600 mt-1">Corps 200 ml / Visage 100 ml</p>
            </a>
            <a href="/categories" className="card p-6 text-center hover:shadow">
              <div className="text-lg font-semibold"><Trans k="catAcc" /></div>
              <p className="text-sm text-gray-600 mt-1">Gants & pinceaux</p>
            </a>
          </div>
        </section>

        <section>
          <SectionTitle><Trans k="reviews" /></SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n:"Camille", c:"Musc Vanille au top, tient toute la journée !" },
              { n:"Sofia", c:"Autobronzant medium naturel, sans traces." },
              { n:"Nadia", c:"Livraison rapide et bons prix, je recommande." },
            ].map((r,i)=>(
              <div key={i} className="card p-6">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-rose"></div>
                  <div className="font-semibold">{r.n}</div>
                </div>
                <div className="mt-3 text-sm text-gray-700">{r.c}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle><Trans k="faq" /></SectionTitle>
          <div className="space-y-4">
            <details className="card p-4"><summary className="cursor-pointer font-medium">Comment choisir mon musc ?</summary><p className="text-sm text-gray-600 mt-2">Par familles olfactives : gourmand, frais, floral. Nos fiches aident au choix.</p></details>
            <details className="card p-4"><summary className="cursor-pointer font-medium">L’autobronzant convient-il aux peaux sensibles ?</summary><p className="text-sm text-gray-600 mt-2">Formules douces, testez sur une petite zone 24h avant.</p></details>
            <details className="card p-4"><summary className="cursor-pointer font-medium">Quels accessoires utiliser ?</summary><p className="text-sm text-gray-600 mt-2">Gant pour le corps, pinceau pour le visage — résultat homogène.</p></details>
          </div>
        </section>

        <section>
          <SectionTitle><Trans k="about" /></SectionTitle>
          <div className="card p-6 gold-gradient">
            <p className="text-gray-800"><Trans k="aboutTxt" /></p>
          </div>
        </section>
      </main>
    </>
  );
}
