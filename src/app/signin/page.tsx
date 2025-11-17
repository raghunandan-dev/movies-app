"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    // If already authenticated, redirect to movies page
    if (status === "authenticated") {
      router.push("/movies");
    }
  }, [status, router]);
  
  // Handle sign in with Keycloak
  const handleSignIn = () => {
    signIn("keycloak", { callbackUrl: "/movies" });
  };
  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign in to MoviesHub</h1>
        
        <button
          onClick={handleSignIn}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign in with Keycloak
        </button>
      </div>
    </div>
  );
}