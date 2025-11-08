export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "../../components/Header";
import Trans from "../../components/Trans";

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-10 space-y-10">
        <section className="hero-gradient rounded-2xl p-8 border-gold">
          <h1 className="text-3xl font-bold"><Trans k="help" /> — LayaliCosmétique</h1>
          <p className="text-gray-700 mt-2"><Trans k="shippingInfo" /></p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <div className="card p-6">
            <h2 className="font-semibold mb-2">Livraison</h2>
            <p className="text-sm text-gray-600">France/Belgique/Espagne : 2–5 jours ouvrés. Suivi inclus. Frais affichés au paiement.</p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold mb-2">Retours</h2>
            <p className="text-sm text-gray-600">14 jours après réception (non-utilisés, scellés). Contact : support@layali-cosmetique.fr</p>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold mb-2">Paiements</h2>
            <p className="text-sm text-gray-600">Carte bancaire via Stripe. Données chiffrées, nous n’y avons jamais accès.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3"><Trans k="faq" /></h2>
          <div className="space-y-4">
            <details className="card p-4">
              <summary className="cursor-pointer font-medium">Quand ma commande est-elle expédiée ?</summary>
              <p className="text-sm text-gray-600 mt-2">Sous 24–48h (jours ouvrés). Le délai transporteur est de 2–5 jours.</p>
            </details>
            <details className="card p-4">
              <summary className="cursor-pointer font-medium">Les muscs sont-ils tenaces ?</summary>
              <p className="text-sm text-gray-600 mt-2">Oui, nos huiles concentrées offrent une tenue longue, modulable.</p>
            </details>
            <details className="card p-4">
              <summary className="cursor-pointer font-medium">L’autobronzant tache-t-il ?</summary>
              <p className="text-sm text-gray-600 mt-2">Utiliser le gant + attendre le séchage. Nos formules minimisent les transferts.</p>
            </details>
          </div>
        </section>
      </main>
    </>
  );
}
