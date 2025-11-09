import Link from "next/link";
import Trans from "./Trans";

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

export default function ProductCard({ p }) {
  const slug = typeof p?.slug === "string" ? p.slug.trim() : "";
  const href = slug ? `/product/${encodeURIComponent(slug)}` : "/product";

  // Si pas de slug -> on n'autorise pas la navigation
  const Wrapper = slug ? Link : "div";

  return (
    <Wrapper className="card overflow-hidden block hover:shadow" href={href}>
      <img src={p.image || ""} alt={p.name} className="h-56 w-full object-cover" />
      <div className="p-4 space-y-2">
        <div className="text-xs text-gray-500"><Trans k={LABEL(p.category)} /></div>
        <div className="font-semibold">
          {p.name}{SIZE(p.category) ? <> — <Trans k={SIZE(p.category)} /></> : null}
        </div>
        <div className="text-sm">{(p.price/100).toFixed(2)} €</div>
      </div>
    </Wrapper>
  );
}
