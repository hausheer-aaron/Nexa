import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const publicRoutes = new Set(["/account"]);

function copyCookies(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { response, user } = await updateSession(request);

  if (pathname === "/auth") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/account";
    const redirectResponse = NextResponse.redirect(redirectUrl);
    copyCookies(response, redirectResponse);
    return redirectResponse;
  }

  if (!user && !publicRoutes.has(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/account";
    redirectUrl.searchParams.set("next", `${pathname}${search}`);
    const redirectResponse = NextResponse.redirect(redirectUrl);
    copyCookies(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
