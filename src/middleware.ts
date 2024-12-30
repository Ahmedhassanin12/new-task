import { type NextRequest, NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware";

import { getToken } from 'next-auth/jwt'

// 1. Specify protected and public routes
const protectedRoutes = ['/', '/dashboard']
const publicRoutes = ['/signin']



export default withAuth(async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  const token = await getToken({ req, secret: process.env.JWT_SECRET });


  // // 3. Redirect to /signin if the user is not authenticated
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  // // 4. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute && token &&
    !req.nextUrl.pathname.startsWith('/')
  ) {

    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  return NextResponse.next()
}, {
  callbacks: {
    async authorized() {
      // This is a work-around for handling redirect on auth pages.
      // We return true here so that the middleware function above
      // is always called.
      return true;
    },
  },
  secret: process.env.JWT_SECRET,
},)

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}