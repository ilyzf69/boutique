"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase-client";
import { useCart } from "../app/store/cart";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "./LangProvider";
import Trans from "./Trans";

export default function Header() {
  const { t } = useLang();
  const { totalQty, totalPrice } = useCart();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    function onDoc(e){ if(!menuRef.current?.contains(e.target)) setOpen(false); }
    document.addEventListener("click", onDoc); 
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const cartLabel = totalQty > 0
    ? `${t.cart} (${totalQty}) — ${(totalPrice/100).toFixed(2)} €`
    : t.cartEmpty;

  async function signOut() { await supabase.auth.signOut(); setOpen(false); }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 header-blur">
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center justify-between gap-3">
        {/* --- MARQUE, plus lisible --- */}
        <Link href="/" className="text-2xl font-bold leading-none">
          <span className="text-brand-gold">Layali</span>{" "}
          <span className="text-brand-rose">Cosmétic</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/product" className="hover:underline"><Trans k="shop" /></Link>
          <Link href="/categories" className="hover:underline"><Trans k="categories" /></Link>
          <Link href="/help" className="hover:underline"><Trans k="help" /></Link>
          <Link href="/legal" className="hover:underline"><Trans k="legal" /></Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Déconnecté : 2 boutons même style (blanc + contour) */}
          {!user && (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/signin"
                className="rounded-full px-4 py-2.5 border bg-white hover:bg-gray-50"
              >
                <Trans k="signin" />
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full px-4 py-2.5 border bg-white hover:bg-gray-50"
              >
                <Trans k="signup" />
              </Link>
            </div>
          )}

          {/* Connecté : menu compte déroulant */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={()=>setOpen(o=>!o)}
                className="rounded-full border px-4 py-2.5 bg-white hover:bg-gray-50"
              >
                <Trans k="account" />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-2xl shadow p-2">
                  <Link href="/account" onClick={()=>setOpen(false)} className="block px-3 py-2 rounded hover:bg-gray-50">
                    <Trans k="account" />
                  </Link>
                  <button onClick={signOut} className="block w-full text-left px-3 py-2 rounded hover:bg-gray-50">
                    <Trans k="signout" />
                  </button>
                </div>
              )}
            </div>
          )}

          <Link href="/cart" className="inline-flex items-center rounded-full border px-5 py-2.5 hover:bg-gray-50">
            {cartLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
