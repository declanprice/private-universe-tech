import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { AuthUser } from "@/shared/types/user";

export const protectedRequest = async (
  request: NextRequest,
  callback: (body: any, user: AuthUser) => any,
) => {
  const _auth = await auth();

  const user = _auth?.user;

  if (!user?.email) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body = {};

  if (request.body) {
    body = await request.json();
  }

  return callback(body, {
    email: user.email,
  });
};
