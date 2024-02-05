import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/') && !request.nextUrl.pathname.includes('/login') && !request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname == '/' || (request.nextUrl.pathname.includes('/login') && request.cookies.has('token'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}


 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}