import { NextRequest } from "next/server";
import authService from "@/services/auth.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await authService.signUp(body.email, body.password);
    return Response.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Something went wrong.", error },
      { status: 500 },
    );
  }
}
