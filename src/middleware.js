import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ["/", "/products/create"];
const publicRoutes = ["/signin", "/signup"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/products/edit/");
  const isPublic = publicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  // if (isProtected && !userId) {
  //   return NextResponse.redirect(new URL("/signin", req.nextUrl));
  // }

  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
