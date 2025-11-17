import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

// Helper function to verify token and get userId
export async function getUserIdFromToken(request: NextRequest) {
    try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    console.log("process.env.NEXT_PUBLIC_KEYCLOAK_PUBLIC_KEY", process.env.NEXT_PUBLIC_KEYCLOAK_PUBLIC_KEY);
    console.log("process.env.KEYCLOAK_PUBLIC_KEY", process.env.KEYCLOAK_PUBLIC_KEY);
    const token = authHeader.split(" ")[1];
    console.log("token.....", token);
    // Verify the token
    const decoded: any = jwt.verify(
      token, 
      process.env.NEXT_PUBLIC_KEYCLOAK_PUBLIC_KEY!, 
      { algorithms: ["RS256"] }
    );
    
    console.log("decoded.sub", decoded.sub);
    return decoded.sub;
} catch (error) {
      console.error("Error creating movie:", error);
    }
}