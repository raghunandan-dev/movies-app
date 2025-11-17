"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  
  // Sync user to database after successful login
  useEffect(() => {
    if (session?.user) {
      // Call sync-user API to ensure user exists in database
      fetch("/api/sync-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).catch((err) => {
        console.error("Failed to sync user:", err);
      });
    }
  }, [session]);
  
  if (status === "loading") {
    return <button className="px-4 py-2 bg-gray-200">Loading...</button>;
  }
  
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-white">Hello, {session.user?.name || session.user?.email}</span>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })} 
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Sign out
        </button>
      </div>
    );
  }
  
  return (
    <button 
      onClick={() => signIn("keycloak", { callbackUrl: "/" })} 
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
    >
      Sign in
    </button>
  );
}