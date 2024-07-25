import { NextRequest } from "next/server";
import authService from "@/services/auth.service";
import { UserAlreadyExistsError } from "@/services/errors/UserAlreadyExistsError";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await authService.signUp(body.email, body.password);
    return Response.json({ message: "ok" });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
