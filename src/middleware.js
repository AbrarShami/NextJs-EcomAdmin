import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ["/", "/products/create", "/products/form", "/products"];
const publicRoutes = ["/signin", "/signup", "/landing-page","/shop"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  const isProtected =
  protectedRoutes.includes(path) || path.startsWith("/products/edit/");
  const isPublic = publicRoutes.includes(path);

  // Read session cookie correctly in middleware
  const session = req.cookies.get("session")?.value;
  const user = await getAuthUser(session);
  const userId = user?.userId;

  // Redirect authenticated user away from public routes
  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect unauthenticated user away from protected routes
  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/landing-page", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
