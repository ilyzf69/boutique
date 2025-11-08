"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase-client";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (error) setMsg(error.message);
    else router.push("/account");
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Mot de passe" value={pwd} onChange={e=>setPwd(e.target.value)} required />
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? "..." : "Se connecter"}</button>
        </form>
        {msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
      </main>
    </>
  );
}
