import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const path = req.nextUrl.pathname;

  // Leer cookies de Supabase
  const accessToken = req.cookies.get("sb-access-token");
  const refreshToken = req.cookies.get("sb-refresh-token");

  const isLoggedIn = !!accessToken || !!refreshToken;

  const protectedRoutes = [
    "/dashboard",
    "/analysis",
    "/upload",
    "/reports",
    "/history",
    "/prompts",
  ];

  const publicRoutes = ["/login", "/register"];

  // Si intenta entrar a rutas privadas sin sesión → login
  if (protectedRoutes.some((route) => path.startsWith(route)) && !isLoggedIn) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si ya está logueado y va a login o register → dashboard
  if (publicRoutes.includes(path) && isLoggedIn) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analysis/:path*",
    "/upload/:path*",
    "/reports/:path*",
    "/history/:path*",
    "/prompts/:path*",
    "/login",
    "/register",
  ],
};
