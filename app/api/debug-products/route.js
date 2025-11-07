import { supabaseServer } from "../../../lib/supabase-server";

export async function GET(req) {
  const supa = supabaseServer();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const { data, error } = await supa.from("products").select("*").eq("slug", slug).limit(1);
    return new Response(JSON.stringify({ bySlug: data, error }), { headers: { "Content-Type": "application/json" } });
  }

  const { data, error } = await supa.from("products").select("id,slug,name,price").order("created_at", { ascending: false });
  return new Response(JSON.stringify({ list: data, error }), { headers: { "Content-Type": "application/json" } });
}
