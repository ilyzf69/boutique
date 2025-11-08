export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabaseServer } from "../../../lib/supabase-server";
import Header from "../../../components/Header";
import AddToCart from "./ui/AddToCart";
import Stars from "../../../components/Stars";
import ShippingBadge from "../../../components/ShippingBadge";
import Trans from "../../../components/Trans";

const LABEL = (cat)=>({
  musc: "category_MUSC",
  lentilles: "category_LENTILLE",
  autobronzant: "category_AUTOBRONZANT",
  autobronzant_visage: "category_AUTOBRONZANT_VISAGE",
  accessoires: "category_ACCESSOIRES",
}[cat] ?? "PRODUIT");

const SIZE = (cat)=>({
  musc: "size_musc",
  autobronzant: "size_tan",
  autobronzant_visage: "size_tan_face",
}[cat] ?? "");

export default async function ProductBySlug({ params }) {
  const supa = supabaseServer();
  const slug = params?.slug ?? "";
  const { data: p, error } = await supa
    .from("products")
    .select("id,slug,name,description,image,category,price")
    .eq("slug", slug)
    .maybeSingle();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8">
        {!p || error ? (
          <div className="mx-auto max-w-screen-md p-8">
            <h1 className="text-xl font-bold"><Trans k="notFound" /></h1>
            <a className="underline mt-4 inline-block" href="/product"><Trans k="backToShop" /></a>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2">
            <img src={p.image || ""} alt={p.name} className="w-full rounded-3xl border object-cover" />
            <div className="space-y-4">
              <div className="text-sm text-gray-500"><Trans k={LABEL(p.category)} /></div>
              <h1 className="text-3xl font-bold">
                {p.name}{SIZE(p.category) ? <> — <Trans k={SIZE(p.category)} /></> : null}
              </h1>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-semibold">{(p.price / 100).toFixed(2)} €</div>
                <Stars value={5} />
              </div>
              <p className="text-gray-700">{p.description}</p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600"><Trans k="deliveryEstimate" />: <Trans k="days" /></span>
                <ShippingBadge />
              </div>
              <p className="text-xs text-gray-500"><Trans k="shippingInfo" /></p>
              <AddToCart product={p} />
              <a className="underline text-sm" href="/product"><Trans k="backToShop" /></a>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
