"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [category, setCategory] = useState("");
  const router = useRouter();

  const startTest = () => {
    if (category) {
      router.push(`/test?category=${category}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-start justify-center font-inter">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/img.png')" }}></div>

      <div className="relative z-10 flex flex-col items-center justify-start h-screen pt-[12vh]">
        <h1 className="text-7xl font-bold tracking-tight">Entraînement TAGE MAGE</h1>
        <p className="text-2xl mt-4 font-medium">Sélectionnez votre catégorie pour commencer</p>

        <div className="mt-8 w-full max-w-xs"> {/* Ajustement de la largeur */}
          <select
            className="select select-secondary w-full max-w-md bg-gray-900 text-white 
                      border border-blue-300 rounded-lg shadow-lg 
                      focus:outline-none focus:border-blue-400
                      transition hover:shadow-2xl hover:border-blue-400 
                      text-base px-6 py-3 truncate" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled className="text-gray-400">
              Choisissez une catégorie
            </option>
            <option value="calcul">📊 Calcul</option>
            <option value="raisonnement">🧠 Raisonnement</option>
          </select>
        </div>

        {/* Bouton Démarrer */}
        <div className="mt-6">
          <button
            className={`px-8 py-3 text-xl font-semibold rounded-lg shadow-lg transition ${
              category
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }`}
            onClick={startTest}
            disabled={!category}
          >
            Démarrer le test
          </button>
        </div>
      </div>
    </div>
  );
}