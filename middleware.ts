import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper to decode JWT
function parseJwt(token: string) {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const roleFromCookie = request.cookies.get("userRole")?.value || "user";
  const { pathname, searchParams } = request.nextUrl;

  console.log("📍 Pathname:", pathname);
  console.log("🍪 Role from cookie:", roleFromCookie);

  const publicPaths = ["/auth/signin", "/auth/signup"];
  const isPublicPath = publicPaths.includes(pathname);

  // 🔐 1. If not authenticated and trying to access protected path
  if (!token && !isPublicPath) {
    const redirectUrl = new URL("/auth/signin", request.url);
    redirectUrl.searchParams.set("redirect", pathname); // keep track of original URL
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ 2. Authenticated users coming from /auth/signin with redirect param
  if (token && isPublicPath && searchParams.has("redirect")) {
    const redirectPath = searchParams.get("redirect");
    if (redirectPath && !publicPaths.includes(redirectPath)) {
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
  }

  // If authenticated and trying to access signin or signup, redirect to dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🛡️ 3. Role-based route protection
  if (pathname.startsWith("/admin") && roleFromCookie === "user") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname.startsWith("/dashboard") && roleFromCookie !== "user") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/checkout",
    // "/cart",
    "/profile",
    "/auth/signin",
    "/auth/signup",
  ],
};
