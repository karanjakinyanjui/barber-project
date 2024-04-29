import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be used to check if the user is authenticated
// You can implement your own logic here, e.g., checking for a valid session or JWT token
const isAuthenticated = (request: NextRequest) => {
  // Example: Check if the session cookie exists
  const sessionCookie = request.cookies.get("session");
  return !!sessionCookie;
};

export function middleware(request: NextRequest) {
  // Get the URL path
  const { pathname } = request.nextUrl;

  // List of paths that don't require authentication
  const publicPaths = ["/login", "/signup", "/api/login", "/api/signup"];

  // If the path is public, allow the request
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated(request)) {
    const redirectURL = request.nextUrl.clone();
    redirectURL.pathname = "/login";
    return NextResponse.redirect(redirectURL);
  }

  // If the user is authenticated, continue to the requested page
  return NextResponse.next();
}

// Make sure to export the middleware configuration
export const config = {
  matcher: ["/:path*"],
};
