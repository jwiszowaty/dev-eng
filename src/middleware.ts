// middleware.js
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Protect only `/teacher` routes
  if (url.pathname.startsWith("/teacher")) {
    const sessionCookie = req.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/student/assignments", req.url));
    }
    try {
      const { payload } = await jwtVerify(
        sessionCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      if (payload.type !== "teacher") {
        return NextResponse.redirect(new URL("/student/assignments", req.url));
      }
    } catch (err) {
      console.log("error: ", err);
      return NextResponse.redirect(new URL("/student/assignments", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/teacher/:path*"], // applies to /teacher and subroutes
};
