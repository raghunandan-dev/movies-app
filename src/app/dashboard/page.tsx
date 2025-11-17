"use client";

import { useState, useEffect } from "react";

type Movie = {
  id: number;
  title: string;
  year: number;
};

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies([
      { id: 1, title: "Inception", year: 2010 },
      { id: 2, title: "Interstellar", year: 2014 },
      { id: 3, title: "The Dark Knight", year: 2008 },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎥 Movie List</h2>
      <ul className="space-y-2">
        {movies.map((m) => (
          <li key={m.id} className="bg-white shadow p-3 rounded">
            {m.title} ({m.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
