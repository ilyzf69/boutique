"use client";

import { LangProvider } from "../components/LangProvider";
// adapte le chemin si besoin : ton store est dans app/store/cart
import { CartProvider } from "../app/store/cart";

export default function Providers({ children }) {
  return (
    <CartProvider>
      <LangProvider>{children}</LangProvider>
    </CartProvider>
  );
}
