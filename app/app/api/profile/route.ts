import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const body = await request.json();
    return Response.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return Response.json({ message: "ok" });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
