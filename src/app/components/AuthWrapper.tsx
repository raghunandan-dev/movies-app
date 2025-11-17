"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
  requireAuth?: boolean;
}

/**
 * Wrapper component that handles authentication state
 * - Shows loading state while checking session
 * - Redirects to sign-in if authentication is required but user is not authenticated
 */
export default function AuthWrapper({ 
  children, 
  requireAuth = true 
}: AuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, requireAuth, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !session) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

