import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { NextAuthOptions } from "next-auth";

console.log("🔧 Loaded env vars:", {
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
  KEYCLOAK_ISSUER: process.env.KEYCLOAK_ISSUER,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET: !!process.env.KEYCLOAK_CLIENT_SECRET,
});
export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
    }),
  ],
    session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Save the access token and user ID to the JWT
      if (account) {
        token.accessToken = account.access_token;
        
        // Save the user ID from the profile
        if (profile?.sub) {
          token.id = profile.sub;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add the access token and user ID to the session
      if (token) {
        session.accessToken = token.accessToken as string;
        
        // Make sure the user object exists
        if (!session.user) {
          session.user = {};
        }
        
        // Add the user ID to the session user object
        session.user.id = token.id as string;
      }
      
      // Mark that we should sync user (will be done client-side or via API)
      if (token.id && !token.synced) {
        token.synced = false; // Will trigger sync on client
      }
      
      return session;
    },
  },
  // Enable debug mode in development
  debug: process.env.NODE_ENV === 'development',
  // Make sure cookies are properly configured
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
