import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|images/|fonts/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. lens.builder.place, lens.localhost:3000, localhost:3000)
  const host = req.headers.get('host');

  // Get the pathname of the request (e.g. /, /onboarding, /lens/admin)
  const path = url.pathname;
  console.log('middleware', { host, path });

  // rewrite root application to `/landing` folder
  if (host === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    console.log('middleware go to landing', host, path);
    return NextResponse.rewrite(new URL(`/landing${path}`, req.url));
  }

  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${host}${path}`, req.url));
}
