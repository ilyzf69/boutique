export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const { supabaseServer } = await import("../../../lib/supabase-server");
  const supabase = supabaseServer();

  try {
    const { items } = await req.json();
    if (!items?.length) return Response.json({ error: "Panier vide" }, { status: 400 });

    const ids = items.map(i => i.product.id);
    const { data: products, error } = await supabase
      .from("products").select("id,name,image,price").in("id", ids);
    if (error) throw error;

    const map = Object.fromEntries(products.map(p => [p.id, p]));
    const line_items = items.map(({ product, qty }) => {
      const p = map[product.id];
      if (!p) throw new Error("Produit inconnu");
      return {
        quantity: Math.max(1, parseInt(qty || 1, 10)),
        price_data: {
          currency: "eur",
          unit_amount: p.price,
          product_data: { name: p.name, images: [p.image || ""] },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
      shipping_address_collection: { allowed_countries: ["FR","BE","ES"] },
      billing_address_collection: "auto",
    });

    return Response.json({ url: session.url });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Erreur paiement" }, { status: 500 });
  }
}
