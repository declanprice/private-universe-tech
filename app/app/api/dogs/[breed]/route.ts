import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { breed: string } },
) {
  try {
    console.log(params.breed);
    const response = await fetch(
      `https://dog.ceo/api/breed/${params.breed}/images/random`,
    );
    const data = await response.json();
    return Response.json(data.message);
  } catch (error) {
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
