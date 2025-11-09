// app/product/[slug]/page.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";
import Stars from "../../../components/Stars";
import ShippingBadge from "../../../components/ShippingBadge";
import ProductGallery from "../../../components/ProductGallery";
import { supabaseServer } from "../../../lib/supabase-server";
import AddToCart from "./ui/AddToCart";
import Trans from "../../../components/Trans";

const LABEL = (cat) =>
  ({
    musc: "category_MUSC",
    lentilles: "category_LENTILLE",
    autobronzant: "category_AUTOBRONZANT",
    autobronzant_visage: "category_AUTOBRONZANT_VISAGE",
    accessoires: "category_ACCESSOIRES",
  }[cat] ?? "PRODUIT");

const SIZE = (cat) =>
  ({
    musc: "size_musc", // 10 ml
    autobronzant: "size_tan", // 200 ml
    autobronzant_visage: "size_tan_face", // 100 ml
  }[cat] ?? "");

function normalizeSlug(s = "") {
  return String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ProductBySlug({ params }) {
  const supa = supabaseServer();
  const rawSlug = decodeURIComponent(String(params?.slug ?? "")).trim();

  // 1) égalité stricte
  let { data: p } = await supa
    .from("products")
    .select("id,slug,name,description,image,images,category,price,created_at")
    .eq("slug", rawSlug)
    .maybeSingle();

  // 2) insensible à la casse
  if (!p) {
    const { data: alt } = await supa
      .from("products")
      .select("id,slug,name,description,image,images,category,price,created_at")
      .ilike("slug", rawSlug);
    if (alt && alt.length) p = alt[0];
  }

  // 3) fallback normalisé
  if (!p) {
    const norm = normalizeSlug(rawSlug);
    const { data: alt2 } = await supa
      .from("products")
      .select("id,slug,name,description,image,images,category,price,created_at")
      .eq("slug", norm)
      .maybeSingle();
    if (alt2) p = alt2;
  }

  // Recommandés (même catégorie)
  let related = [];
  if (p?.category) {
    const { data: rel } = await supa
      .from("products")
      .select("id,slug,name,description,image,category,price,created_at")
      .eq("category", p.category)
      .neq("slug", p.slug)
      .order("created_at", { ascending: false })
      .limit(4);
    related = rel || [];
  }

  // Galerie (images[] JSON si présent, sinon image unique)
  const gallery =
    Array.isArray(p?.images) && p.images.length
      ? p.images.filter(Boolean)
      : [p?.image].filter(Boolean);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-8 space-y-12">
        {!p ? (
          <div className="mx-auto max-w-screen-md text-center py-16">
            <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
            <p className="text-gray-600 mb-6">
              Le produit demandé n’existe pas ou n’est plus disponible.
            </p>
            <a
              href="/product"
              className="inline-flex items-center rounded-full border px-5 py-2.5 hover:bg-gray-50"
            >
              ← Retourner à la boutique
            </a>
          </div>
        ) : (
          <>
            {/* Haut de page : galerie + infos */}
            <div className="grid gap-10 md:grid-cols-2">
              <ProductGallery images={gallery} />
              <div className="space-y-5">
                <div className="text-sm text-gray-500">
                  <Trans k={LABEL(p.category)} />
                </div>
                <h1 className="text-3xl font-bold">
                  {p.name}
                  {SIZE(p.category) ? (
                    <>
                      {" "}
                      — <Trans k={SIZE(p.category)} />
                    </>
                  ) : null}
                </h1>

                <div className="flex items-center gap-4">
                  <div className="text-2xl font-semibold">
                    {(p.price / 100).toFixed(2)} €
                  </div>
                  <Stars value={5} />
                </div>

                <p className="text-gray-700">{p.description}</p>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    <Trans k="deliveryEstimate" />: <Trans k="days" />
                  </span>
                  <ShippingBadge />
                </div>

                <div className="card p-4">
                  <div className="font-semibold mb-2">
                    <Trans k="details" />
                  </div>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {p.category === "musc" && (
                      <>
                        <li>
                          Format : <Trans k="size_musc" />
                        </li>
                        <li>Type : huile concentrée</li>
                        <li>Tenue : longue durée (selon peau)</li>
                      </>
                    )}
                    {p.category === "autobronzant" && (
                      <>
                        <li>
                          Format : <Trans k="size_tan" />
                        </li>
                        <li>Application : gant recommandé</li>
                        <li>Résultat : hâle homogène</li>
                      </>
                    )}
                    {p.category === "autobronzant_visage" && (
                      <>
                        <li>
                          Format : <Trans k="size_tan_face" />
                        </li>
                        <li>Application : pinceau visage conseillé</li>
                        <li>Résultat : naturel, progressif</li>
                      </>
                    )}
                    {p.category === "accessoires" && (
                      <>
                        <li>Compatibles avec nos autobronzants</li>
                        <li>Nettoyage à l’eau tiède</li>
                      </>
                    )}
                  </ul>
                </div>

                <AddToCart product={p} />

                <a
                  className="underline text-sm inline-block"
                  href="/product"
                >
                  ← Retour à la boutique
                </a>
              </div>
            </div>

            {/* Recommandés */}
            {related.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Vous aimerez aussi
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((r) => (
                    <ProductCard key={r.id} p={r} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  );
}
