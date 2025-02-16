import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-black text-white font-sans" style={{ fontFamily: "SF Pro, sans-serif" }}>
        {/* Barre de navigation légèrement grisâtre */}
        <nav className="bg-[#0d0d0d] text-gray-300 text-[16px]">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between py-5 px-8">
            {/* Logo Apple */}
            <Link href="/">
              <Image src="/Apple_logo_white.svg.png" alt="Apple Logo" width={24} height={24} className="cursor-pointer hover:opacity-80" />
            </Link>

            {/* Liens centrés */}
            <div className="flex space-x-10">
              <Link href="/" className="hover:text-white transition">Store</Link>
              <Link href="/" className="hover:text-white transition">Mac</Link>
              <Link href="/" className="hover:text-white transition">iPad</Link>
              <Link href="/" className="hover:text-white transition">iPhone</Link>
              <Link href="/" className="hover:text-white transition">Watch</Link>
              <Link href="/" className="hover:text-white transition">Vision</Link>
              <Link href="/" className="hover:text-white transition">AirPods</Link>
              <Link href="/" className="hover:text-white transition">TV & Home</Link>
              <Link href="/" className="hover:text-white transition">Entertainment</Link>
              <Link href="/" className="hover:text-white transition">Accessories</Link>
              <Link href="/" className="hover:text-white transition">Support</Link>
            </div>

            {/* Icônes à droite */}
            <div className="flex space-x-8">
              <span className="cursor-pointer hover:text-white transition">🔍</span>
              <span className="cursor-pointer hover:text-white transition">🛒</span>
            </div>
          </div>
        </nav>

        {/* Contenu principal */}
        <main>{children}</main>
      </body>
    </html>
  );
}
