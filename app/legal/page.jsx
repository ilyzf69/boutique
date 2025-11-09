export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "../../components/Header";

export default function LegalPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-4 py-10 space-y-8">
        <section className="hero-gradient rounded-2xl p-8 border-gold">
          <h1 className="text-3xl font-bold">Mentions légales</h1>
          <p className="text-gray-700 mt-2">Informations légales de LayaliCosmétique.</p>
        </section>

        <div className="card p-6 space-y-4">
          <p><b>Éditeur :</b> LayaliCosmétique, société individuelle.</p>
          <p><b>Contact :</b> support@layali-cosmetique.fr</p>
          <p><b>Hébergement :</b> Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, USA.</p>
          <p><b>Propriété intellectuelle :</b> Tous contenus (textes, visuels, marques) sont protégés.</p>
          <p><b>Protection des données :</b> Les données sont traitées pour la gestion des commandes. Droit d’accès, de rectification et de suppression via notre support.</p>
        </div>
      </main>
    </>
  );
}
