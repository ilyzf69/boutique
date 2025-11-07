import Stripe from "stripe";
import { supabaseServer } from "../../../lib/supabase-server";

export async function POST(req){
  try{
    const { items } = await req.json(); // [{ product: {id}, qty }]
    if(!items?.length) return Response.json({ error:"Panier vide" }, { status:400 });

    const supabase = supabaseServer();
    const ids = items.map(i=>i.product.id);
    const { data: products } = await supabase.from("products").select("id,name,image,price").in("id", ids);
    const map = Object.fromEntries((products||[]).map(p=>[p.id,p]));

    const line_items = items.map(({product,qty})=>{
      const p = map[product.id];
      if(!p) throw new Error("Produit inconnu");
      return {
        quantity: Math.max(1, parseInt(qty||1,10)),
        price_data: {
          currency: "eur",
          unit_amount: p.price,
          product_data: { name: p.name, images: [p.image||""] }
        }
      };
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode:"payment",
      line_items,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return Response.json({ url: session.url });
  }catch(e){
    console.error(e);
    return Response.json({ error:"Erreur paiement" }, { status:500 });
  }
}
