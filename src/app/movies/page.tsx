'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authFetch } from "../lib/authFetch";

interface Movie {
    _id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
}

export default function MoviesPage() {
    const { data: session, status } = useSession();
    console.log("session", session, status)
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
     fetchMovies();
    }, []);

    const fetchMovies = async () => {
      try {
        const response = await authFetch("/api/movie");
        if (!response.ok) {
          const errorData = await response.json();
          console.error("API error response:", errorData);
          throw new Error(errorData.error || "Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.movies || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "loading" || loading) {
      return <div className="text-center p-8">Loading...</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Movies</h1>
      
        <Link href="/movies/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block">
          Add New Movie
        </Link>
      
        {movies.length === 0 ? (
          <p className="text-gray-500">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie._id} className="border rounded-lg overflow-hidden shadow-md">
                {movie.imageUrl && (
                  <img 
                    src={movie.imageUrl} 
                    alt={movie.title} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-gray-600 mt-2">{movie.description}</p>
                  <Link href={`/movies/${movie._id}`} className="text-blue-500 mt-4 inline-block">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}