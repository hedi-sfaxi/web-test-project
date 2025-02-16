import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white flex items-start justify-center">
      {/* Image de fond */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img.png')" }}></div>

      {/* Contenu principal repositionné plus haut */}
      <div className="relative z-10 flex flex-col items-center justify-start h-screen pt-[10vh]">
        <h1 className="text-7xl font-bold">iPhone 16 Pro</h1>
        <p className="text-2xl mt-4">Hello, Apple Intelligence.</p>

        <div className="mt-8 flex gap-6">
          {/* Bouton "Learn more" */}
          <Link href="/learn-more">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-full text-xl font-semibold shadow-lg hover:bg-blue-700 transition">
              Learn more
            </button>
          </Link>

          {/* Bouton "Buy" */}
          <Link href="/buy">
            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full text-xl font-semibold hover:bg-blue-600 hover:text-white transition">
              Buy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}