import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

/**
 * Get the server-side session for use in API routes and server components
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the access token from the session
 * Returns null if no session or token exists
 */
export async function getAccessToken() {
  const session = await getSession();
  return (session as any)?.accessToken || null;
}

/**
 * Get the user ID from the session
 * Returns null if no session exists
 */
export async function getUserId() {
  const session = await getSession();
  return (session?.user as any)?.id || null;
}

