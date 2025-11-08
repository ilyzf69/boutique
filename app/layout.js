import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "NESSBEAUTY — Boutique Musc & Lentilles",
  description:
    "Parfums musc, lentilles cosmétiques, autobronzants et accessoires.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Les <link> DOIVENT être dans <head> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
          precedence="default" /* évite l’avertissement Next 16 */
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
