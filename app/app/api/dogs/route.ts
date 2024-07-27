import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return Response.json({ message: "ok" });
  } catch (error) {
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
