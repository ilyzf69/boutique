import Link from "next/link";
import CartButton from "./CartButton";

export default function Header(){
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex justify-end gap-4 py-2 text-sm text-gray-600">
          <button className="hover:underline">FR ▾</button>
          <button className="hover:underline">Compte</button>
          <CartButton/>
        </div>
        <div className="flex justify-center py-4">
          <Link href="/" className="text-2xl font-bold">musc<span className="mx-2 text-brand-rose">•</span>lentilles</Link>
        </div>
        <nav className="flex justify-center gap-6 pb-4 text-sm">
          <Link className="hover:underline" href="/">Boutique</Link>
          <Link className="hover:underline" href="/legal/lentilles">Lentilles</Link>
          <Link className="hover:underline" href="/legal/mentions">Mentions</Link>
        </nav>
      </div>
    </header>
  );
}
