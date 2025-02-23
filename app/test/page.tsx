"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function TestPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); // 🔥 Vérifier que ce n'est pas null

  interface Question {
    id: number;
    question: string;
    choices: string[];
    answer_index: number;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | null }>({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Gestion du chrono
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Charger les questions SEULEMENT si category est défini
  useEffect(() => {
    if (category) {
      fetch(`/api/questions?category=${category}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erreur lors du chargement des questions");
          return res.json();
        })
        .then((data) => {
          setQuestions(data);
          // Initialiser selectedAnswers avec des valeurs null
          const initialAnswers = data.reduce((acc: any, question: any) => {
            acc[question.id] = null;
            return acc;
          }, {});
          setSelectedAnswers(initialAnswers);
        })
        .catch((error) => console.error(error));
    }
  }, [category]);

  // Fonction pour sélectionner une réponse
  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    if (!submitted) { // Permet de modifier seulement avant soumission
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex, // Met à jour la réponse sélectionnée pour la question
      }));
    }
  };

  // Fonction pour soumettre les réponses et calculer le score
  const handleSubmit = () => {
    let newScore = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer_index) {
        newScore += 4; // Ajoute 4 points pour chaque bonne réponse
      }
    });

    setScore(newScore);
    setSubmitted(true); // Empêche de modifier les réponses après soumission
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center font-inter">
      {/* Chrono en haut à gauche */}
      <div className="absolute top-4 left-4 text-2xl font-semibold bg-gray-800 bg-opacity-90 px-5 py-3 rounded-lg shadow-lg">
        ⏳ {formatTime(timeLeft)}
      </div>

      {/* Score en haut à droite (s'affiche après soumission) */}
      {score !== null && (
        <div className="absolute top-4 right-4 text-2xl font-semibold bg-gray-800 bg-opacity-90 px-5 py-3 rounded-lg shadow-lg">
          🎯 Score : {score}/60
        </div>
      )}

      {/* Vérification si la catégorie est bien définie */}
      {category ? (
        <>
          <h1 className="text-4xl font-bold">{category.toUpperCase()}</h1>
          <div className="mt-8 w-full max-w-3xl space-y-6">
            {questions.length > 0 ? (
              questions.map((q) => (
                <div key={q.id} className="p-4 bg-gray-900 rounded-lg shadow-md">
                  <p className="text-lg font-semibold">{q.question}</p>
                  <div className="mt-4 space-y-2">
                    {q.choices.map((choice, index) => {
                      const isCorrect = index === q.answer_index; // Vérifie si c'est la bonne réponse
                      const isSelected = selectedAnswers[q.id] === index; // Vérifie si c'est sélectionné

                      return (
                        <button
                          key={index}
                          onClick={() => handleSelectAnswer(q.id, index)}
                          disabled={submitted} // Désactive après soumission
                          className={`w-full px-4 py-2 rounded-lg text-white transition ${
                            submitted
                              ? isCorrect
                                ? "bg-green-500" // Si correct -> vert 🟩
                                : isSelected
                                ? "bg-red-500" // Mauvais choix -> rouge 🟥
                                : "bg-gray-700"
                              : isSelected
                              ? "bg-blue-500"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Chargement des questions...</p>
            )}
          </div>

          {/* Bouton Soumettre en bas */}
          {!submitted && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-lg"
              >
                Soumettre mes réponses
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-red-500 text-xl">Erreur : Aucune catégorie sélectionnée.</p>
      )}
    </div>
  );
}