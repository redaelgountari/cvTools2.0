import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const publicPaths = ["/Signup", "/"];
  const path = request.nextUrl.pathname;

  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!publicPaths.includes(path) && !session) {
    return NextResponse.redirect(new URL('/Signup', request.url));
  }

  if (path === "/Signup" && session) {
    return NextResponse.redirect(new URL('/Resume', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Resume/:path*", "/ReadCV/:path*", "/Signup", "/CoverLetter/:path*", "/"]
};