import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can add additional middleware logic here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access if token exists (user is authenticated)
        // For public routes, you can check the path here
        return !!token;
      },
    },
  }
);

// Configure which routes should be protected
export const config = {
  matcher: [
    // Protect these routes - require authentication
    "/movies/:path*",
    "/my-movies/:path*",
    "/dashboard/:path*",
    // Allow public access to:
    // - API routes (they handle their own auth)
    // - Auth routes
    // - Root and other public pages
  ],
};
