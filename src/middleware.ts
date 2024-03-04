import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authToken = request.cookies.get("token")?.value;
  const loggedInUserNotAccessPaths = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/verify",
  ].indexOf(request.nextUrl.pathname);
  if (loggedInUserNotAccessPaths > -1) {
    if (authToken) {
      return NextResponse.redirect(new URL("/workspace", request.url));
    }
    if (request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
