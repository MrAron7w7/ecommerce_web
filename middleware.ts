import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./lib/auth.config";
import { auth } from "./lib/auth";

const { auth: middleware } = NextAuth(authConfig);

// Rutas públicas (accesibles sin login)
const publicRoutes =
  [
    "/",
    "/login",
    "/register",
    "/products",
    "/products/[id]",
    "/about",
    "/contact",
    "/favorites",
    "/cart",
  ];

// Rutas solo para administradores
const adminOnlyRoutes = [
  "/dashboard",
  "/dashboard/products",
  "/dashboard/categories",
  "/dashboard/orders",
];

export default middleware( async(req) => {
    const { nextUrl } = req;
    const auths = await auth();
    
    const isLoggedIn = !!auths?.user;
   
  const isAdmin = auths?.user?.role === "ADMIN";
    const path = nextUrl.pathname;
    
    console.log("🚀 Middleware: auth.user", auths?.user);

  // 1. Si no está logueado y no está en una ruta pública => redirige a login
  if (!isLoggedIn && !publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2. Si ya está logueado y quiere acceder a /login o /register => redirigir
  if (isLoggedIn && ["/login", "/register"].includes(path)) {
    const redirectTo = isAdmin ? "/dashboard" : "/";
    return NextResponse.redirect(new URL(redirectTo, nextUrl));
  }

  // 3. Si no es admin y quiere acceder a una ruta protegida para admin => redirigir
  if (adminOnlyRoutes.some((route) => path.startsWith(route)) && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl)); // O /403 si prefieres
  }

  // 4. Todo OK
  return NextResponse.next();
});

// Configuración del matcher para que se aplique en todas las rutas necesarias
export const config = {
  matcher: [
    // Evitar procesar rutas internas de Next.js o archivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Aplicar también en rutas de API o trpc si usas RPC
    '/(api|trpc)(.*)',
  ],
};
