import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  // const _auth = await auth();
  //
  // // when an unauthenticated user attempts to access the app, redirect to sign in.
  // if (!_auth?.user && !request.url.includes('/auth/')) {
  //     return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  // }
  //
  // return NextResponse.next();
}
