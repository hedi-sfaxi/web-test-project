"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTestPage = pathname.startsWith("/test");

  return (
    <html lang="fr">
      <body className="bg-black text-white font-sans" style={{ fontFamily: "SF Pro, sans-serif" }}>
        {/* Barre de navigation */}
        <nav className="bg-[#0d0d0d] text-gray-300 text-[16px]">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-8">
            {/* Bouton Home uniquement sur les pages de test */}
            {isTestPage ? (
              <Link href="/" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Home
              </Link>
            ) : (
              <div /> // Pour éviter que le reste bouge quand Home est caché
            )}

            {/* Boutons Connexion et Inscription toujours à droite */}
            <div className="ml-auto flex space-x-4">
              <Link href="/connexion" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition">
                Connexion
              </Link>
              <Link href="/inscription" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Inscription
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <main>{children}</main>
      </body>
    </html>
  );
}