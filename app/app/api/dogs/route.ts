import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const breeds = Object.keys(data.message);
    return Response.json(breeds);
  } catch (error) {
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
