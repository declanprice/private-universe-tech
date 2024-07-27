import { NextRequest } from "next/server";
import profileService from "@/services/profile.service";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const _auth = await auth();
    const user = _auth?.user;
    if (!user || !user.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const profile = await profileService.create(
      user.email,
      body.username,
      body.jobTitle,
    );
    return Response.json({ profile });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong." }, { status: 500 });
  }
}
