"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase-client";
import Header from "../../components/Header";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.replace("/auth/signin");
      else setUser(data.user);
    });
  }, [router]);

  if (!user) return null;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-md px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
        <div className="card p-6">
          <p><b>Email :</b> {user.email}</p>
          <p className="text-sm text-gray-500 mt-2">Compte créé : {new Date(user.created_at).toLocaleString()}</p>
        </div>
      </main>
    </>
  );
}
