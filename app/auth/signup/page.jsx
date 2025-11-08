"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase-client";
import Header from "../../../components/Header";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setMsg("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pwd,
      options: { data: { first_name: first, last_name: last } },
    });
    setLoading(false);
    if (error) {
      const txt = /at least 6 characters/i.test(error.message)
        ? "Le mot de passe doit contenir au moins 6 caractères."
        : error.message;
      setMsg(txt);
    } else {
      setMsg("Compte créé. Vérifie tes emails pour confirmer.");
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="input" placeholder="Prénom" value={first} onChange={e=>setFirst(e.target.value)} required />
          <input className="input" placeholder="Nom" value={last} onChange={e=>setLast(e.target.value)} required />
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Mot de passe (min 6)" value={pwd} onChange={e=>setPwd(e.target.value)} required />
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? "..." : "Créer"}</button>
        </form>
        {msg && <p className="mt-4 text-sm">{msg}</p>}
      </main>
    </>
  );
}
