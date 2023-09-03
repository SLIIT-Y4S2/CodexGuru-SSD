import { User } from "./types/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes: string[] = ["/", "/lab-session"];

export function middleware(request: NextRequest) {
  const currentUser: string | undefined =
    request.cookies.get("currentUser")?.value;

  // if path is login and there is currentUser cookie, redirect to home
  if (request.nextUrl.pathname == "/login" && currentUser) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // if path is not login and there is no currentUser cookie, redirect to login
  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    //TODO: add all the student paths here
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");
    return response;
  }
  // if path starts with /admin and currentUser is not admin, redirect to login
  if (request.nextUrl.pathname.startsWith("/admin") && currentUser) {
    const user: User = JSON.parse(currentUser);
    if (user.role !== "admin") {
      request.cookies.delete("currentUser");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("currentUser");
      return response;
    }
  }
  // if path is /instructor and currentUser is not instructor, redirect to login
  if (request.nextUrl.pathname.startsWith("/instructor") && currentUser) {
    const user: User = JSON.parse(currentUser);
    if (user.role !== "instructor") {
      request.cookies.delete("currentUser");
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("currentUser");
      return response;
    }
  }
}
