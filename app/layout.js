import "./globals.css";
import { CartProvider } from "./store/cart";

export const metadata = { title: "Musc & Lentilles — Test", description: "Shop test" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr"><body><CartProvider>{children}</CartProvider></body></html>
  );
}
