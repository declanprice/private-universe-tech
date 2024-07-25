import { NextRequest } from "next/server";
import { signIn } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await signIn("credentials", body);
    return Response.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
